// models/productModel.js
const db = require('../config/database');

const ProductModel = {
  // Mengambil seluruh produk dengan filter (untuk admin atau internal)
  getAll: async (filter = {}) => {
    let query = `
      SELECT p.*, k.nama_kategori 
      FROM produk p 
      LEFT JOIN kategori k ON p.kategori_id = k.id 
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (filter.search) {
      query += ` AND (LOWER(p.nama_produk) LIKE $${paramIndex} OR LOWER(p.deskripsi) LIKE $${paramIndex} OR LOWER(p.manfaat_tradisional) LIKE $${paramIndex})`;
      params.push(`%${filter.search.toLowerCase()}%`);
      paramIndex++;
    }

    if (filter.kategori_id) {
      query += ` AND p.kategori_id = $${paramIndex}`;
      params.push(filter.kategori_id);
      paramIndex++;
    }

    if (filter.status) {
      query += ` AND p.status = $${paramIndex}`;
      params.push(filter.status);
      paramIndex++;
    }

    if (filter.is_unggulan !== undefined) {
      query += ` AND p.is_unggulan = $${paramIndex}`;
      params.push(filter.is_unggulan);
      paramIndex++;
    }

    query += ' ORDER BY p.is_unggulan DESC, p.id DESC';

    const res = await db.query(query, params);
    return res.rows;
  },

  // Mengambil produk aktif untuk katalog publik
  getActive: async (filter = {}) => {
    return await ProductModel.getAll({ ...filter, status: 'aktif' });
  },

  // Mengambil produk unggulan untuk beranda publik
  getFeatured: async () => {
    return await ProductModel.getAll({ status: 'aktif', is_unggulan: true });
  },

  // Mengambil produk berdasarkan ID
  getById: async (id) => {
    const query = `
      SELECT p.*, k.nama_kategori 
      FROM produk p 
      LEFT JOIN kategori k ON p.kategori_id = k.id 
      WHERE p.id = $1
    `;
    const res = await db.query(query, [id]);
    return res.rows[0] || null;
  },

  // Mengambil produk berdasarkan Slug
  getBySlug: async (slug) => {
    const query = `
      SELECT p.*, k.nama_kategori 
      FROM produk p 
      LEFT JOIN kategori k ON p.kategori_id = k.id 
      WHERE p.slug = $1
    `;
    const res = await db.query(query, [slug]);
    return res.rows[0] || null;
  },

  // Cek apakah slug sudah digunakan
  slugExists: async (slug, excludeId = null) => {
    let query = 'SELECT COUNT(*) FROM produk WHERE slug = $1';
    const params = [slug];
    if (excludeId) {
      query += ' AND id != $2';
      params.push(excludeId);
    }
    const res = await db.query(query, params);
    return parseInt(res.rows[0].count, 10) > 0;
  },

  // Menambahkan produk baru
  create: async (data) => {
    const {
      kategori_id, nama_produk, slug, deskripsi, komposisi,
      manfaat_tradisional, rasa, cara_penyajian, cara_penyimpanan,
      masa_simpan, peringatan, ukuran, harga, stok, foto_url,
      is_unggulan, status
    } = data;

    const query = `
      INSERT INTO produk (
        kategori_id, nama_produk, slug, deskripsi, komposisi,
        manfaat_tradisional, rasa, cara_penyajian, cara_penyimpanan,
        masa_simpan, peringatan, ukuran, harga, stok, foto_url,
        is_unggulan, status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
      ) RETURNING *
    `;

    const values = [
      kategori_id, nama_produk, slug, deskripsi, komposisi,
      manfaat_tradisional, rasa, cara_penyajian, cara_penyimpanan,
      masa_simpan, peringatan, ukuran, harga, stok, foto_url,
      is_unggulan || false, status || 'aktif'
    ];

    const res = await db.query(query, values);
    return res.rows[0];
  },

  // Memperbarui data produk
  update: async (id, data) => {
    const {
      kategori_id, nama_produk, slug, deskripsi, komposisi,
      manfaat_tradisional, rasa, cara_penyajian, cara_penyimpanan,
      masa_simpan, peringatan, ukuran, harga, stok, foto_url,
      is_unggulan, status
    } = data;

    const query = `
      UPDATE produk SET 
        kategori_id = $1, nama_produk = $2, slug = $3, deskripsi = $4, komposisi = $5,
        manfaat_tradisional = $6, rasa = $7, cara_penyajian = $8, cara_penyimpanan = $9,
        masa_simpan = $10, peringatan = $11, ukuran = $12, harga = $13, stok = $14, foto_url = $15,
        is_unggulan = $16, status = $17, updated_at = CURRENT_TIMESTAMP
      WHERE id = $18
      RETURNING *
    `;

    const values = [
      kategori_id, nama_produk, slug, deskripsi, komposisi,
      manfaat_tradisional, rasa, cara_penyajian, cara_penyimpanan,
      masa_simpan, peringatan, ukuran, harga, stok, foto_url,
      is_unggulan || false, status || 'aktif', id
    ];

    const res = await db.query(query, values);
    return res.rows[0] || null;
  },

  // Menghapus data produk
  delete: async (id) => {
    const res = await db.query('DELETE FROM produk WHERE id = $1', [id]);
    return res.rowCount > 0;
  }
};

module.exports = ProductModel;
