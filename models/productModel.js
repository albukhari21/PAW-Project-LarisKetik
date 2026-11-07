// models/productModel.js
const db = require('../config/database');

const ProductModel = {
  // READ: Mengambil seluruh data
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM produk ORDER BY id DESC');
    return rows;
  },

  // READ: Mengambil data berdasarkan ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM produk WHERE id = ?', [id]);
    return rows[0];
  },

  // CREATE: Menambahkan data baru
  create: async (data) => {
    const { nama_produk, pemilik, target_media, harga, keunggulan, caption_otomatis } = data;
    const [result] = await db.query(
      'INSERT INTO produk (nama_produk, pemilik, target_media, harga, keunggulan, caption_otomatis) VALUES (?, ?, ?, ?, ?, ?)',
      [nama_produk, pemilik, target_media, harga, keunggulan, caption_otomatis]
    );
    return { id: result.insertId, ...data };
  },

  // UPDATE: Memperbarui data berdasarkan ID
  update: async (id, data) => {
    const { nama_produk, pemilik, target_media, harga, keunggulan, caption_otomatis } = data;
    const [result] = await db.query(
      'UPDATE produk SET nama_produk = ?, pemilik = ?, target_media = ?, harga = ?, keunggulan = ?, caption_otomatis = ? WHERE id = ?',
      [nama_produk, pemilik, target_media, harga, keunggulan, caption_otomatis, id]
    );
    return result.affectedRows > 0 ? { id, ...data } : null;
  },

  // DELETE: Menghapus data berdasarkan ID
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM produk WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ProductModel;