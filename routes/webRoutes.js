// routes/webRoutes.js
const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// Halaman Publik Seduh Rimba
router.get('/', publicController.getHome);
router.get('/katalog', publicController.getCatalog);
router.get('/produk/:slug', publicController.getProductDetail);
router.get('/tentang', publicController.getAbout);

module.exports = router;
