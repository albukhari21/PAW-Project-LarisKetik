// controllers/chat.controller.js
const geminiService = require('../services/gemini.service');
const { formatResponse } = require('../utils/responseFormatter');

const chatController = {
  // POST /api/chat
  handleChat: async (req, res) => {
    try {
      const message = req.sanitizedMessage || req.body.message;

      const result = await geminiService.generateChatReply(message);

      return res.status(200).json(formatResponse(true, 'Berhasil mendapatkan tanggapan dari Asisten AI', {
        reply: result.reply,
        isConfigured: result.isConfigured
      }));
    } catch (error) {
      console.error('[CHAT CONTROLLER ERROR]:', error.message);
      return res.status(500).json(formatResponse(false, error.message || 'Terjadi kesalahan pada layanan AI Assistant'));
    }
  }
};

module.exports = chatController;
