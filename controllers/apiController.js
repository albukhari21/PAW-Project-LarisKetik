// controllers/apiController.js
const ProductModel = require('../models/productModel');
const { formatResponse } = require('../utils/responseFormatter');

const apiController = {
  // GET /api/status
  getStatus: async (req, res) => {
    try {
      await ProductModel.getAll();
      res.status(200).json(formatResponse(true, "Server & Database LarisKetik berjalan normal", {
        status: "Healthy / Online",
        database: "MySQL (larisketik_db) Terhubung",
        uptime: process.uptime()
      }));
    } catch (error) {
      res.status(500).json(formatResponse(false, "Server berjalan namun database gagal diakses: " + (error.message || error.code), {
        status: "Degraded / Database Offline",
        uptime: process.uptime()
      }));
    }
  },

  // GET /api/produk
  getAllProduk: async (req, res) => {
    try {
      const data = await ProductModel.getAll();
      res.status(200).json(formatResponse(true, "Berhasil mengambil seluruh data produk", data));
    } catch (error) {
      res.status(500).json(formatResponse(false, error.message || error.code || "Gagal mengambil data produk"));
    }
  },

  // GET /api/produk/:id
  getProdukById: async (req, res) => {
    try {
      const data = await ProductModel.getById(req.params.id);
      if (!data) return res.status(404).json(formatResponse(false, "Produk tidak ditemukan"));
      res.status(200).json(formatResponse(true, "Detail produk berhasil ditemukan", data));
    } catch (error) {
      res.status(500).json(formatResponse(false, error.message || error.code || "Gagal mengambil detail produk"));
    }
  },

  // POST /api/produk
  createProduk: async (req, res) => {
    try {
      const { nama_produk, pemilik, target_media, harga, keunggulan, caption_otomatis } = req.body;
      if (!nama_produk || !pemilik || harga === undefined || harga === null || harga === '' || isNaN(Number(harga))) {
        return res.status(400).json(formatResponse(false, "Kolom nama_produk, pemilik, dan harga wajib diisi dengan benar"));
      }
      const newProduct = await ProductModel.create(req.body);
      res.status(201).json(formatResponse(true, "Data produk berhasil ditambahkan ke database", newProduct));
    } catch (error) {
      res.status(500).json(formatResponse(false, error.message || error.code || "Gagal menambahkan produk"));
    }
  },

  // PUT /api/produk/:id
  updateProduk: async (req, res) => {
    try {
      const { nama_produk, pemilik, target_media, harga, keunggulan, caption_otomatis } = req.body;
      if (!nama_produk || !pemilik || harga === undefined || harga === null || harga === '' || isNaN(Number(harga))) {
        return res.status(400).json(formatResponse(false, "Kolom nama_produk, pemilik, dan harga wajib diisi dengan benar"));
      }
      const updatedProduct = await ProductModel.update(req.params.id, req.body);
      if (!updatedProduct) return res.status(404).json(formatResponse(false, "Produk tidak ditemukan untuk diperbarui"));
      res.status(200).json(formatResponse(true, "Data produk berhasil diperbarui", updatedProduct));
    } catch (error) {
      res.status(500).json(formatResponse(false, error.message || error.code || "Gagal memperbarui produk"));
    }
  },

  // DELETE /api/produk/:id
  deleteProduk: async (req, res) => {
    try {
      const isDeleted = await ProductModel.delete(req.params.id);
      if (!isDeleted) return res.status(404).json(formatResponse(false, "Produk tidak ditemukan untuk dihapus"));
      res.status(200).json(formatResponse(true, "Produk berhasil dihapus dari database"));
    } catch (error) {
      res.status(500).json(formatResponse(false, error.message || error.code || "Gagal menghapus produk"));
    }
  }
};

module.exports = apiController;