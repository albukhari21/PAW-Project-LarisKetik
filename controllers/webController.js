const ProductModel = require('../models/productModel');

const webController = {
  // Render halaman beranda frontend
  getHomePage: (req, res) => {
    const products = ProductModel.getAll();
    res.render('index', { 
      pageTitle: 'LarisKetik - Solusi Caption Promosi UMKM',
      products 
    });
  }
};

module.exports = webController;