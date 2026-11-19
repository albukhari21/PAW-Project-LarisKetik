// controllers/publicController.js
const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/categoryModel');
const config = require('../config/appConfig');

// Helper format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

const publicController = {
  // GET / (Beranda)
  getHome: async (req, res) => {
    try {
      const [featuredProducts, categories] = await Promise.all([
        ProductModel.getFeatured(),
        CategoryModel.getAll()
      ]);

      res.render('public/home', {
        pageTitle: 'Seduh Rimba - Jamu & Minuman Herbal Alami Kemasan Tradisional',
        currentPath: '/',
        featuredProducts,
        categories,
        formatRupiah,
        whatsappNumber: config.whatsappNumber
      });
    } catch (err) {
      console.error('Error public getHome:', err);
      res.status(500).send('Gagal memuat halaman beranda: ' + err.message);
    }
  },

  // GET /katalog (Katalog Produk Aktif)
  getCatalog: async (req, res) => {
    try {
      const search = req.query.search ? req.query.search.trim() : '';
      const kategori_id = req.query.kategori ? req.query.kategori.trim() : '';

      const [products, categories] = await Promise.all([
        ProductModel.getActive({ search, kategori_id }),
        CategoryModel.getAll()
      ]);

      res.render('public/catalog', {
        pageTitle: 'Katalog Jamu Herbal Alami - Seduh Rimba',
        currentPath: '/katalog',
        products,
        categories,
        search,
        kategori_id,
        formatRupiah,
        whatsappNumber: config.whatsappNumber
      });
    } catch (err) {
      console.error('Error public getCatalog:', err);
      res.status(500).send('Gagal memuat katalog produk: ' + err.message);
    }
  },

  // GET /produk/:slug (Detail Produk)
  getProductDetail: async (req, res) => {
    try {
      const slug = req.params.slug;
      const product = await ProductModel.getBySlug(slug);

      if (!product || product.status !== 'aktif') {
        return res.status(404).render('public/notFound', {
          pageTitle: 'Produk Tidak Ditemukan - Seduh Rimba',
          currentPath: '/katalog',
          message: 'Maaf, jamu atau produk herbal yang Anda cari tidak tersedia atau sudah nonaktif.'
        });
      }

      // Ambil produk rekomendasi lain dari kategori serupa
      const relatedProducts = (await ProductModel.getActive({ kategori_id: product.kategori_id }))
        .filter(p => p.id !== product.id)
        .slice(0, 3);

      // Siapkan URL WhatsApp otomatis
      const waText = encodeURIComponent(
        `Halo Bu Wati (Seduh Rimba), saya ingin memesan:\n` +
        `*${product.nama_produk}* (${product.ukuran})\n` +
        `Harga: ${formatRupiah(product.harga)}\n` +
        `Mohon info ketersediaan stok dan ongkir. Terima kasih!`
      );
      const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${waText}`;

      res.render('public/detail', {
        pageTitle: `${product.nama_produk} - Seduh Rimba`,
        currentPath: '/katalog',
        product,
        relatedProducts,
        formatRupiah,
        whatsappUrl,
        whatsappNumber: config.whatsappNumber
      });
    } catch (err) {
      console.error('Error public getProductDetail:', err);
      res.status(500).send('Gagal memuat detail produk: ' + err.message);
    }
  },

  // GET /tentang (Profil UMKM & Kontak)
  getAbout: (req, res) => {
    res.render('public/about', {
      pageTitle: 'Tentang Kami - Kisah & Filosofi Seduh Rimba',
      currentPath: '/tentang',
      whatsappNumber: config.whatsappNumber
    });
  }
};

module.exports = publicController;
