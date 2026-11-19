// controllers/chat.controller.js
const geminiService = require('../services/gemini.service');
const { formatResponse } = require('../utils/responseFormatter');

const chatController = {
  // POST /api/chat
  handleChat: async (req, res) => {
    try {
      const message = req.sanitizedMessage || req.body.message;
      const produkSlug = req.body.produkSlug ? String(req.body.produkSlug).trim() : null;

      const result = await geminiService.generateChatReply(message, produkSlug);

      return res.status(200).json({
        success: true,
        message: 'Tanggapan asisten berhasil dibuat',
        reply: result.reply,
        data: {
          reply: result.reply,
          isConfigured: result.isConfigured
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('[CHAT CONTROLLER ERROR]:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message || 'Terjadi kesalahan pada layanan AI Assistant',
        reply: 'Asisten sedang sibuk, coba lagi sebentar ya.'
      });
    }
  }
};

module.exports = chatController;
