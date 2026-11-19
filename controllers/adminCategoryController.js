// controllers/adminCategoryController.js
const CategoryModel = require('../models/categoryModel');
const db = require('../config/database');

const adminCategoryController = {
  // GET /admin/kategori
  index: async (req, res) => {
    try {
      // Query categories with count of products
      const query = `
        SELECT k.*, COUNT(p.id) AS total_produk
        FROM kategori k
        LEFT JOIN produk p ON k.id = p.kategori_id
        GROUP BY k.id
        ORDER BY k.id ASC
      `;
      const result = await db.query(query);

      res.render('admin/categories/index', {
        pageTitle: 'Kelola Kategori Jamu - Seduh Rimba',
        currentPath: '/admin/kategori',
        categories: result.rows,
        success: req.query.success || null,
        error: req.query.error || null
      });
    } catch (err) {
      console.error('Error admin category index:', err);
      res.status(500).send('Gagal memuat kategori: ' + err.message);
    }
  },

  // POST /admin/kategori/tambah
  postCreate: async (req, res) => {
    try {
      const { nama_kategori, deskripsi } = req.body;
      if (!nama_kategori || !nama_kategori.trim()) {
        return res.redirect('/admin/kategori?error=Nama kategori wajib diisi!');
      }

      await CategoryModel.create({
        nama_kategori: nama_kategori.trim(),
        deskripsi: deskripsi ? deskripsi.trim() : ''
      });

      res.redirect('/admin/kategori?success=Kategori baru berhasil ditambahkan!');
    } catch (err) {
      console.error('Error create category:', err);
      res.redirect('/admin/kategori?error=Gagal menambah kategori: ' + err.message);
    }
  },

  // POST /admin/kategori/edit/:id
  postEdit: async (req, res) => {
    try {
      const id = req.params.id;
      const { nama_kategori, deskripsi } = req.body;

      if (!nama_kategori || !nama_kategori.trim()) {
        return res.redirect('/admin/kategori?error=Nama kategori wajib diisi!');
      }

      await CategoryModel.update(id, {
        nama_kategori: nama_kategori.trim(),
        deskripsi: deskripsi ? deskripsi.trim() : ''
      });

      res.redirect('/admin/kategori?success=Data kategori berhasil diperbarui!');
    } catch (err) {
      console.error('Error update category:', err);
      res.redirect('/admin/kategori?error=Gagal memperbarui kategori: ' + err.message);
    }
  },

  // POST /admin/kategori/hapus/:id
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      await CategoryModel.delete(id);
      res.redirect('/admin/kategori?success=Kategori berhasil dihapus!');
    } catch (err) {
      console.error('Error delete category:', err);
      res.redirect('/admin/kategori?error=' + encodeURIComponent(err.message));
    }
  }
};

module.exports = adminCategoryController;
