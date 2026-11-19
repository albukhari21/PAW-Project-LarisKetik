// models/categoryModel.js
const db = require('../config/database');

const CategoryModel = {
  getAll: async () => {
    const res = await db.query('SELECT * FROM kategori ORDER BY id ASC');
    return res.rows;
  },

  getById: async (id) => {
    const res = await db.query('SELECT * FROM kategori WHERE id = $1', [id]);
    return res.rows[0] || null;
  },

  create: async ({ nama_kategori, deskripsi }) => {
    const res = await db.query(
      'INSERT INTO kategori (nama_kategori, deskripsi) VALUES ($1, $2) RETURNING *',
      [nama_kategori, deskripsi || '']
    );
    return res.rows[0];
  },

  update: async (id, { nama_kategori, deskripsi }) => {
    const res = await db.query(
      'UPDATE kategori SET nama_kategori = $1, deskripsi = $2 WHERE id = $3 RETURNING *',
      [nama_kategori, deskripsi || '', id]
    );
    return res.rows[0] || null;
  },

  delete: async (id) => {
    // Cek apakah ada produk yang masih memakai kategori ini
    const countRes = await db.query('SELECT COUNT(*) FROM produk WHERE kategori_id = $1', [id]);
    if (parseInt(countRes.rows[0].count, 10) > 0) {
      throw new Error('Kategori tidak dapat dihapus karena masih digunakan oleh produk.');
    }
    const res = await db.query('DELETE FROM kategori WHERE id = $1', [id]);
    return res.rowCount > 0;
  }
};

module.exports = CategoryModel;
