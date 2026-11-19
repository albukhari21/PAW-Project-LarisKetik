// controllers/authController.js
const config = require('../config/appConfig');

const authController = {
  // GET /admin/login
  getLogin: (req, res) => {
    res.render('admin/login', {
      pageTitle: 'Login Pemilik Toko - Seduh Rimba',
      error: req.query.error || null,
      success: req.query.success || null
    });
  },

  // POST /admin/login
  postLogin: (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render('admin/login', {
        pageTitle: 'Login Pemilik Toko - Seduh Rimba',
        error: 'Username dan password wajib diisi!',
        success: null
      });
    }

    if (username.trim() === config.adminUser && password === config.adminPass) {
      req.session.isAdmin = true;
      req.session.adminUser = config.adminUser;
      return res.redirect('/admin/produk');
    }

    return res.render('admin/login', {
      pageTitle: 'Login Pemilik Toko - Seduh Rimba',
      error: 'Username atau password salah. Silakan coba lagi.',
      success: null
    });
  },

  // GET /admin/logout
  getLogout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/admin/login?success=Anda berhasil keluar dari sistem');
    });
  }
};

module.exports = authController;
