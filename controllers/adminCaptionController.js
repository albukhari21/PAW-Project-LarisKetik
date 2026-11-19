// controllers/adminCaptionController.js
const ProductModel = require('../models/productModel');
const CaptionLogModel = require('../models/captionLogModel');
const geminiService = require('../services/gemini.service');

const adminCaptionController = {
  // GET /admin/caption
  index: async (req, res) => {
    try {
      const selectedProductId = req.query.produk_id ? parseInt(req.query.produk_id, 10) : null;

      const [products, captionLogs] = await Promise.all([
        ProductModel.getAll(),
        selectedProductId 
          ? CaptionLogModel.getByProductId(selectedProductId)
          : CaptionLogModel.getRecent(30)
      ]);

      res.render('admin/caption/index', {
        pageTitle: 'Generator Caption Promosi AI - Seduh Rimba',
        currentPath: '/admin/caption',
        products,
        selectedProductId,
        captionLogs,
        success: req.query.success || null,
        error: req.query.error || null
      });
    } catch (err) {
      console.error('Error adminCaptionController index:', err);
      res.status(500).send('Gagal memuat generator caption: ' + err.message);
    }
  },

  // POST /admin/caption/generate
  generate: async (req, res) => {
    try {
      const { produk_id, platform, gaya, catatan } = req.body;

      if (!produk_id) {
        return res.status(400).json({
          success: false,
          message: 'Silakan pilih produk jamu yang ingin dipromosikan.'
        });
      }

      const product = await ProductModel.getById(produk_id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produk tidak ditemukan di database.'
        });
      }

      const caption = await geminiService.generateCaption({
        product,
        platform: platform || 'whatsapp',
        gaya: gaya || 'santai',
        catatan: catatan || ''
      });

      return res.status(200).json({
        success: true,
        message: 'Caption berhasil diracik oleh AI',
        caption: caption
      });
    } catch (err) {
      console.error('Error adminCaptionController generate:', err);
      return res.status(500).json({
        success: false,
        message: err.message || 'Gagal meracik caption AI'
      });
    }
  },

  // POST /admin/caption/simpan
  save: async (req, res) => {
    try {
      const { produk_id, platform, gaya, isi_caption } = req.body;

      if (!produk_id || !platform || !gaya || !isi_caption || !isi_caption.trim()) {
        if (req.xhr || req.headers.accept?.includes('json')) {
          return res.status(400).json({ success: false, message: 'Data caption tidak lengkap untuk disimpan.' });
        }
        return res.redirect('/admin/caption?error=Data caption tidak lengkap untuk disimpan.');
      }

      await CaptionLogModel.create({
        produk_id: parseInt(produk_id, 10),
        platform: platform.toLowerCase(),
        gaya: gaya.toLowerCase(),
        isi_caption: isi_caption.trim()
      });

      if (req.xhr || req.headers.accept?.includes('json')) {
        return res.status(200).json({ success: true, message: 'Caption berhasil disimpan ke riwayat!' });
      }

      res.redirect('/admin/caption?success=Caption promosi berhasil disimpan ke riwayat!');
    } catch (err) {
      console.error('Error adminCaptionController save:', err);
      if (req.xhr || req.headers.accept?.includes('json')) {
        return res.status(500).json({ success: false, message: err.message });
      }
      res.redirect('/admin/caption?error=' + encodeURIComponent(err.message));
    }
  },

  // POST /admin/caption/hapus/:id
  deleteLog: async (req, res) => {
    try {
      const id = req.params.id;
      await CaptionLogModel.delete(id);
      res.redirect('/admin/caption?success=Riwayat caption berhasil dihapus.');
    } catch (err) {
      console.error('Error adminCaptionController deleteLog:', err);
      res.redirect('/admin/caption?error=Gagal menghapus riwayat caption: ' + err.message);
    }
  }
};

module.exports = adminCaptionController;
