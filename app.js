require('dotenv').config();
const express = require('express');
const path = require('path');
const config = require('./config/appConfig');
const requestLogger = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');

const app = express();

// View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parsing Body Request untuk JSON dan Form Input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pasang Logger
app.use(requestLogger);

// Pasang Routes
app.use('/', webRoutes);
app.use('/api', apiRoutes);

// Handler 404 (Route tidak ditemukan)
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: `Endpoint API '${req.method} ${req.originalUrl}' tidak ditemukan`
    });
  }
  res.status(404).send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px;">
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Halaman <code>${req.originalUrl}</code> tidak tersedia.</p>
      <a href="/" style="color: #4f46e5; text-decoration: underline;">Kembali ke Beranda</a>
    </div>
  `);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal server'
  });
});

// Jalankan Server
app.listen(config.port, () => {
  console.log(`====================================================`);
  console.log(`🚀 Server berjalan di http://localhost:${config.port}`);
  console.log(`📡 Endpoint API Status : http://localhost:${config.port}/api/status`);
  console.log(`📦 Endpoint API Produk : http://localhost:${config.port}/api/produk`);
  console.log(`====================================================`);
});