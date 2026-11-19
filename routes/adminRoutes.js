// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const adminProductController = require('../controllers/adminProductController');
const adminCategoryController = require('../controllers/adminCategoryController');
const adminCaptionController = require('../controllers/adminCaptionController');
const { isAuthenticated, isGuest } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// === AUTHENTICATION ROUTES ===
router.get('/login', isGuest, authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);

// === PROTECTED ADMIN ROUTES ===
// Redirect /admin ke /admin/produk
router.get('/', isAuthenticated, (req, res) => {
  res.redirect('/admin/produk');
});

// CRUD PRODUK
router.get('/produk', isAuthenticated, adminProductController.index);
router.get('/produk/tambah', isAuthenticated, adminProductController.getCreate);
router.post('/produk/tambah', isAuthenticated, upload.single('foto_file'), adminProductController.postCreate);
router.get('/produk/edit/:id', isAuthenticated, adminProductController.getEdit);
router.post('/produk/edit/:id', isAuthenticated, upload.single('foto_file'), adminProductController.postEdit);
router.post('/produk/hapus/:id', isAuthenticated, adminProductController.delete);

// CRUD KATEGORI
router.get('/kategori', isAuthenticated, adminCategoryController.index);
router.post('/kategori/tambah', isAuthenticated, adminCategoryController.postCreate);
router.post('/kategori/edit/:id', isAuthenticated, adminCategoryController.postEdit);
router.post('/kategori/hapus/:id', isAuthenticated, adminCategoryController.delete);

// GENERATOR CAPTION PROMOSI AI
router.get('/caption', isAuthenticated, adminCaptionController.index);
router.post('/caption/generate', isAuthenticated, adminCaptionController.generate);
router.post('/caption/simpan', isAuthenticated, adminCaptionController.save);
router.post('/caption/hapus/:id', isAuthenticated, adminCaptionController.deleteLog);

module.exports = router;
