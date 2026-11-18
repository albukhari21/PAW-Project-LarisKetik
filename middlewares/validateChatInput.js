// middlewares/validateChatInput.js
const { formatResponse } = require('../utils/responseFormatter');

const validateChatInput = (req, res, next) => {
  const { message } = req.body;

  // 1. Validasi keberadaan dan tipe data input
  if (message === undefined || message === null || typeof message !== 'string') {
    return res.status(400).json(formatResponse(false, 'Field "message" wajib diisi dengan teks string'));
  }

  const trimmedMessage = message.trim();

  // 2. Validasi pesan kosong
  if (trimmedMessage.length === 0) {
    return res.status(400).json(formatResponse(false, 'Pesan tidak boleh kosong'));
  }

  // 3. Validasi batas panjang pesan (Guardrail: Min 2 karakter, Max 500 karakter)
  if (trimmedMessage.length < 2) {
    return res.status(400).json(formatResponse(false, 'Pesan terlalu pendek, minimal 2 karakter'));
  }

  if (trimmedMessage.length > 500) {
    return res.status(400).json(formatResponse(false, 'Pesan terlalu panjang, maksimal 500 karakter'));
  }

  // Simpan pesan yang sudah di-trim untuk dipakai controller
  req.sanitizedMessage = trimmedMessage;
  next();
};

module.exports = validateChatInput;
