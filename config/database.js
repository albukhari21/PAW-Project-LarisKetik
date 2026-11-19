// config/database.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'seduh_rimba_db',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// Verifikasi koneksi saat inisialisasi
pool.connect((err, client, release) => {
  if (err) {
    const errorDetail = err.message || err.code || err;
    console.error('❌ Gagal koneksi ke database PostgreSQL:', errorDetail);
    if (err.code === 'ECONNREFUSED' || err.code === 'EACCES') {
      console.error('👉 Pastikan service PostgreSQL (port 5432) sudah berjalan di Windows / pgAdmin 4.');
    } else if (err.code === '28P01') {
      console.error('👉 Password atau username PostgreSQL di file .env salah.');
    } else if (err.code === '3D000') {
      console.error(`👉 Database '${process.env.DB_NAME}' belum dibuat di pgAdmin 4.`);
    }
  } else {
    console.log(`✅ Terhubung ke database PostgreSQL (${process.env.DB_NAME || 'seduh_rimba_db'}) via pgAdmin 4`);
    release();
  }
});

module.exports = pool;
