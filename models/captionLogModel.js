// models/captionLogModel.js
const db = require('../config/database');

const CaptionLogModel = {
  // Mengambil riwayat caption per produk
  getByProductId: async (produk_id) => {
    const query = `
      SELECT c.*, p.nama_produk 
      FROM caption_log c
      JOIN produk p ON c.produk_id = p.id
      WHERE c.produk_id = $1
      ORDER BY c.created_at DESC
    `;
    const res = await db.query(query, [produk_id]);
    return res.rows;
  },

  // Mengambil seluruh riwayat caption terbaru
  getRecent: async (limit = 20) => {
    const query = `
      SELECT c.*, p.nama_produk, p.foto_url
      FROM caption_log c
      JOIN produk p ON c.produk_id = p.id
      ORDER BY c.created_at DESC
      LIMIT $1
    `;
    const res = await db.query(query, [limit]);
    return res.rows;
  },

  // Menyimpan riwayat caption baru
  create: async ({ produk_id, platform, gaya, isi_caption }) => {
    const query = `
      INSERT INTO caption_log (produk_id, platform, gaya, isi_caption)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const res = await db.query(query, [produk_id, platform, gaya, isi_caption]);
    return res.rows[0];
  },

  // Menghapus riwayat caption berdasarkan ID
  delete: async (id) => {
    const res = await db.query('DELETE FROM caption_log WHERE id = $1', [id]);
    return res.rowCount > 0;
  }
};

module.exports = CaptionLogModel;
