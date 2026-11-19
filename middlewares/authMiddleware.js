// middlewares/authMiddleware.js

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.redirect('/admin/login');
};

const isGuest = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin/produk');
  }
  return next();
};

module.exports = {
  isAuthenticated,
  isGuest
};
