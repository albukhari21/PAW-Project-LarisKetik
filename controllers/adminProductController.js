// controllers/adminProductController.js
const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/categoryModel');

// Helper untuk membuat slug otomatis dari nama produk jika kosong
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const adminProductController = {
  // GET /admin/produk (Daftar produk dengan pencarian & filter)
  index: async (req, res) => {
    try {
      const search = req.query.search ? req.query.search.trim() : '';
      const kategori_id = req.query.kategori_id || '';

      const [products, categories] = await Promise.all([
        ProductModel.getAll({ search, kategori_id }),
        CategoryModel.getAll()
      ]);

      res.render('admin/products/index', {
        pageTitle: 'Kelola Produk Jamu - Seduh Rimba',
        currentPath: '/admin/produk',
        products,
        categories,
        search,
        kategori_id,
        success: req.query.success || null,
        error: req.query.error || null
      });
    } catch (err) {
      console.error('Error admin products index:', err);
      res.status(500).send('Gagal memuat data produk: ' + err.message);
    }
  },

  // GET /admin/produk/tambah
  getCreate: async (req, res) => {
    try {
      const categories = await CategoryModel.getAll();
      res.render('admin/products/form', {
        pageTitle: 'Tambah Produk Jamu Baru - Seduh Rimba',
        currentPath: '/admin/produk',
        categories,
        product: {},
        isEdit: false,
        error: null
      });
    } catch (err) {
      res.status(500).send('Gagal memuat form tambah produk: ' + err.message);
    }
  },

  // POST /admin/produk/tambah
  postCreate: async (req, res) => {
    try {
      const categories = await CategoryModel.getAll();
      const {
        kategori_id, nama_produk, slug, deskripsi, komposisi,
        manfaat_tradisional, rasa, cara_penyajian, cara_penyimpanan,
        masa_simpan, peringatan, ukuran, harga, stok, foto_url,
        is_unggulan, status
      } = req.body;

      // 1. Validasi field wajib
      if (!nama_produk || !kategori_id || !deskripsi || !komposisi || !manfaat_tradisional || !harga) {
        return res.render('admin/products/form', {
          pageTitle: 'Tambah Produk Jamu Baru - Seduh Rimba',
          currentPath: '/admin/produk',
          categories,
          product: req.body,
          isEdit: false,
          error: 'Mohon lengkapi semua kolom wajib (Nama, Kategori, Deskripsi, Komposisi, Manfaat Tradisional, dan Harga).'
        });
      }

      // 2. Validasi numerik harga dan stok
      const numHarga = parseFloat(harga);
      const numStok = parseInt(stok || 0, 10);

      if (isNaN(numHarga) || numHarga <= 0) {
        return res.render('admin/products/form', {
          pageTitle: 'Tambah Produk Jamu Baru - Seduh Rimba',
          currentPath: '/admin/produk',
          categories,
          product: req.body,
          isEdit: false,
          error: 'Harga harus berupa angka positif (lebih dari 0).'
        });
      }

      if (isNaN(numStok) || numStok < 0) {
        return res.render('admin/products/form', {
          pageTitle: 'Tambah Produk Jamu Baru - Seduh Rimba',
          currentPath: '/admin/produk',
          categories,
          product: req.body,
          isEdit: false,
          error: 'Stok harus berupa bilangan bulat tidak negatif (0 atau lebih).'
        });
      }

      // 3. Generate dan Validasi Slug
      let cleanSlug = slug ? generateSlug(slug) : generateSlug(nama_produk);
      if (await ProductModel.slugExists(cleanSlug)) {
        cleanSlug = cleanSlug + '-' + Date.now().toString().slice(-4);
      }

      // 4. Penanganan Foto (Upload Multer atau URL)
      let finalFotoUrl = foto_url ? foto_url.trim() : '';
      if (req.file) {
        finalFotoUrl = '/uploads/' + req.file.filename;
      }
      if (!finalFotoUrl) {
        finalFotoUrl = 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80';
      }

      // 5. Simpan ke database
      await ProductModel.create({
        kategori_id: parseInt(kategori_id, 10),
        nama_produk: nama_produk.trim(),
        slug: cleanSlug,
        deskripsi: deskripsi.trim(),
        komposisi: komposisi.trim(),
        manfaat_tradisional: manfaat_tradisional.trim(),
        rasa: rasa ? rasa.trim() : 'Segar berkhasiat',
        cara_penyajian: cara_penyajian ? cara_penyajian.trim() : 'Kocok sebelum diminum.',
        cara_penyimpanan: cara_penyimpanan ? cara_penyimpanan.trim() : 'Simpan di tempat sejuk.',
        masa_simpan: masa_simpan ? masa_simpan.trim() : '7 hari di kulkas',
        peringatan: peringatan ? peringatan.trim() : 'Aman dikonsumsi harian dalam batas wajar.',
        ukuran: ukuran ? ukuran.trim() : 'Kemasan 250 ml',
        harga: numHarga,
        stok: numStok,
        foto_url: finalFotoUrl,
        is_unggulan: is_unggulan === 'true' || is_unggulan === true || is_unggulan === 'on',
        status: status || 'aktif'
      });

      res.redirect('/admin/produk?success=Produk berhasil ditambahkan ke katalog Seduh Rimba!');
    } catch (err) {
      console.error('Error postCreate product:', err);
      const categories = await CategoryModel.getAll();
      res.render('admin/products/form', {
        pageTitle: 'Tambah Produk Jamu Baru - Seduh Rimba',
        currentPath: '/admin/produk',
        categories,
        product: req.body,
        isEdit: false,
        error: 'Terjadi kesalahan sistem: ' + err.message
      });
    }
  },

  // GET /admin/produk/edit/:id
  getEdit: async (req, res) => {
    try {
      const [product, categories] = await Promise.all([
        ProductModel.getById(req.params.id),
        CategoryModel.getAll()
      ]);

      if (!product) {
        return res.redirect('/admin/produk?error=Produk tidak ditemukan.');
      }

      res.render('admin/products/form', {
        pageTitle: 'Ubah Data Produk - ' + product.nama_produk,
        currentPath: '/admin/produk',
        categories,
        product,
        isEdit: true,
        error: null
      });
    } catch (err) {
      res.status(500).send('Gagal memuat form edit produk: ' + err.message);
    }
  },

  // POST /admin/produk/edit/:id
  postEdit: async (req, res) => {
    try {
      const id = req.params.id;
      const categories = await CategoryModel.getAll();
      const existingProduct = await ProductModel.getById(id);

      if (!existingProduct) {
        return res.redirect('/admin/produk?error=Produk tidak ditemukan untuk diperbarui.');
      }

      const {
        kategori_id, nama_produk, slug, deskripsi, komposisi,
        manfaat_tradisional, rasa, cara_penyajian, cara_penyimpanan,
        masa_simpan, peringatan, ukuran, harga, stok, foto_url,
        is_unggulan, status
      } = req.body;

      // 1. Validasi field wajib
      if (!nama_produk || !kategori_id || !deskripsi || !komposisi || !manfaat_tradisional || !harga) {
        return res.render('admin/products/form', {
          pageTitle: 'Ubah Data Produk - ' + existingProduct.nama_produk,
          currentPath: '/admin/produk',
          categories,
          product: { ...req.body, id },
          isEdit: true,
          error: 'Mohon lengkapi semua kolom wajib (Nama, Kategori, Deskripsi, Komposisi, Manfaat Tradisional, dan Harga).'
        });
      }

      // 2. Validasi numerik harga dan stok
      const numHarga = parseFloat(harga);
      const numStok = parseInt(stok || 0, 10);

      if (isNaN(numHarga) || numHarga <= 0) {
        return res.render('admin/products/form', {
          pageTitle: 'Ubah Data Produk - ' + existingProduct.nama_produk,
          currentPath: '/admin/produk',
          categories,
          product: { ...req.body, id },
          isEdit: true,
          error: 'Harga harus berupa angka positif (lebih dari 0).'
        });
      }

      if (isNaN(numStok) || numStok < 0) {
        return res.render('admin/products/form', {
          pageTitle: 'Ubah Data Produk - ' + existingProduct.nama_produk,
          currentPath: '/admin/produk',
          categories,
          product: { ...req.body, id },
          isEdit: true,
          error: 'Stok harus berupa bilangan bulat tidak negatif (0 atau lebih).'
        });
      }

      // 3. Validasi Slug Unik
      const cleanSlug = slug ? generateSlug(slug) : generateSlug(nama_produk);
      if (await ProductModel.slugExists(cleanSlug, id)) {
        return res.render('admin/products/form', {
          pageTitle: 'Ubah Data Produk - ' + existingProduct.nama_produk,
          currentPath: '/admin/produk',
          categories,
          product: { ...req.body, id },
          isEdit: true,
          error: `Slug URL "${cleanSlug}" sudah digunakan oleh produk lain. Silakan ubah slug.`
        });
      }

      // 4. Penanganan Foto
      let finalFotoUrl = existingProduct.foto_url;
      if (foto_url && foto_url.trim()) {
        finalFotoUrl = foto_url.trim();
      }
      if (req.file) {
        finalFotoUrl = '/uploads/' + req.file.filename;
      }

      // 5. Update ke database
      await ProductModel.update(id, {
        kategori_id: parseInt(kategori_id, 10),
        nama_produk: nama_produk.trim(),
        slug: cleanSlug,
        deskripsi: deskripsi.trim(),
        komposisi: komposisi.trim(),
        manfaat_tradisional: manfaat_tradisional.trim(),
        rasa: rasa ? rasa.trim() : existingProduct.rasa,
        cara_penyajian: cara_penyajian ? cara_penyajian.trim() : existingProduct.cara_penyajian,
        cara_penyimpanan: cara_penyimpanan ? cara_penyimpanan.trim() : existingProduct.cara_penyimpanan,
        masa_simpan: masa_simpan ? masa_simpan.trim() : existingProduct.masa_simpan,
        peringatan: peringatan ? peringatan.trim() : existingProduct.peringatan,
        ukuran: ukuran ? ukuran.trim() : existingProduct.ukuran,
        harga: numHarga,
        stok: numStok,
        foto_url: finalFotoUrl,
        is_unggulan: is_unggulan === 'true' || is_unggulan === true || is_unggulan === 'on',
        status: status || 'aktif'
      });

      res.redirect('/admin/produk?success=Data produk berhasil diperbarui!');
    } catch (err) {
      console.error('Error postEdit product:', err);
      const categories = await CategoryModel.getAll();
      res.render('admin/products/form', {
        pageTitle: 'Ubah Data Produk',
        currentPath: '/admin/produk',
        categories,
        product: { ...req.body, id: req.params.id },
        isEdit: true,
        error: 'Terjadi kesalahan sistem: ' + err.message
      });
    }
  },

  // POST /admin/produk/hapus/:id
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await ProductModel.getById(id);
      if (!product) {
        return res.redirect('/admin/produk?error=Produk tidak ditemukan untuk dihapus.');
      }

      await ProductModel.delete(id);
      res.redirect(`/admin/produk?success=Produk "${product.nama_produk}" berhasil dihapus dari database.`);
    } catch (err) {
      console.error('Error delete product:', err);
      res.redirect('/admin/produk?error=Gagal menghapus produk: ' + err.message);
    }
  }
};

module.exports = adminProductController;
