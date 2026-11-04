const express = require('express');
const path = require('path');
const config = require('./config/appConfig');
const requestLogger = require('./middlewares/logger');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');

const app = express();

// Konfigurasi View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parsing Body Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pasang Middleware Logger untuk seluruh request
app.use(requestLogger);

// Pemasangan Routes
app.use('/', webRoutes);        // Route Frontend
app.use('/api', apiRoutes);     // Route API (/api/status & /api/produk)

// Jalankan Server
app.listen(config.port, () => {
  console.log(`====================================================`);
  console.log(`🚀 ${config.appName} Server berjalan di http://localhost:${config.port}`);
  console.log(`📡 Endpoint API Status : http://localhost:${config.port}/api/status`);
  console.log(`📦 Endpoint API Produk : http://localhost:${config.port}/api/produk`);
  console.log(`====================================================`);
});