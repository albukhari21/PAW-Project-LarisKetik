const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');

// Halaman utama frontend
router.get('/', webController.getHomePage);

module.exports = router;