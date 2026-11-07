// config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'larisketik_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// Verifikasi koneksi saat inisialisasi program
pool.getConnection()
  .then(conn => {
    console.log('✅ Terhubung ke database MySQL (larisketik_db)');
    conn.release();
  })
  .catch(err => {
    const errorDetail = err.message || err.code || err;
    console.error('❌ Gagal koneksi ke database MySQL:', errorDetail);
    if (err.code === 'ECONNREFUSED' || err.code === 'EACCES') {
      console.error('👉 Pastikan service MySQL di XAMPP / MariaDB sudah dinyalakan (Start).');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('👉 Username atau Password database di file .env tidak sesuai.');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error(`👉 Database '${process.env.DB_NAME || 'larisketik_db'}' belum dibuat di MySQL.`);
    }
  });

module.exports = pool;