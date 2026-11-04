const ProductModel = require('../models/productModel');
const { formatResponse } = require('../utils/responseFormatter');

const apiController = {
  // GET /api/status
  getStatus: (req, res) => {
    res.status(200).json(formatResponse(true, "Server LarisKetik berjalan dengan normal dan siap melayani permintaan.", {
      app: "LarisKetik Backend Engine",
      version: "v1.0",
      status: "Online / Healthy",
      uptime: process.uptime()
    }));
  },

  // GET /api/produk
  getProduk: (req, res) => {
    const data = ProductModel.getAll();
    res.status(200).json(formatResponse(true, "Data produk UMKM berhasil diambil", data));
  }
};

module.exports = apiController;