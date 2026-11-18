// routes/chat.routes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const validateChatInput = require('../middlewares/validateChatInput');

// POST /api/chat
router.post('/chat', validateChatInput, chatController.handleChat);

module.exports = router;
