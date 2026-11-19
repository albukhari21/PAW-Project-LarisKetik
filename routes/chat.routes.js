// routes/chat.routes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const validateChatInput = require('../middlewares/validateChatInput');
const { chatRateLimiter } = require('../middlewares/rateLimitMiddleware');

// POST /api/chat dengan Rate Limiting dan Validasi Input Guardrail
router.post('/chat', chatRateLimiter, validateChatInput, chatController.handleChat);

module.exports = router;
