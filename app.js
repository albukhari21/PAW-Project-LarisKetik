require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const config = require('./config/appConfig');
const requestLogger = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');
const chatRoutes = require('./routes/chat.routes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// View Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files (public assets & uploads)
app.use(express.static(path.join(__dirname, 'public')));

// Parsing Body Request untuk JSON dan Form Input
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi Session untuk Admin Bu Wati
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 jam
  }
}));

// Pasang Logger
app.use(requestLogger);

// Global Template Variables
app.use((req, res, next) => {
  res.locals.whatsappNumber = config.whatsappNumber;
  res.locals.appName = config.appName;
  next();
});

// Pasang Routes
app.use('/', webRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);
app.use('/api', chatRoutes);

// Handler 404 (Route tidak ditemukan)
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: `Endpoint API '${req.method} ${req.originalUrl}' tidak ditemukan`
    });
  }
  res.status(404).render('public/notFound', {
    pageTitle: 'Halaman Tidak Ditemukan - Seduh Rimba',
    currentPath: '',
    message: `Halaman '${req.originalUrl}' tidak tersedia atau sudah dipindahkan.`,
    whatsappNumber: config.whatsappNumber
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal server'
  });
});

// Jalankan Server jika dieksekusi langsung
if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`====================================================`);
    console.log(`🚀 Server berjalan di http://localhost:${config.port}`);
    console.log(`🌿 Seduh Rimba Admin  : http://localhost:${config.port}/admin`);
    console.log(`📡 Endpoint API Status : http://localhost:${config.port}/api/status`);
    console.log(`📦 Endpoint API Produk : http://localhost:${config.port}/api/produk`);
    console.log(`🤖 Endpoint AI Chatbot : http://localhost:${config.port}/api/chat`);
    console.log(`====================================================`);
  });
}

module.exports = app;