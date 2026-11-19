// middlewares/rateLimitMiddleware.js
const rateLimit = require('express-rate-limit');

// Rate limiter khusus endpoint Chatbot AI (30 pesan per 15 menit per IP)
const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 30, // Maksimal 30 request per IP dalam 15 menit
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: 'Batas interaksi terlampaui. Mohon tunggu beberapa menit sebelum bertanya kembali.',
      reply: 'Maaf, Anda mengirim terlalu banyak pertanyaan dalam waktu singkat. Mohon istirahat sejenak dan coba tanyakan kembali beberapa menit lagi ya! 🌿'
    });
  }
});

module.exports = {
  chatRateLimiter
};
