// config/gemini.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY || '';
const modelName = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

let genAI = null;
if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
  genAI = new GoogleGenerativeAI(apiKey);
}

module.exports = {
  genAI,
  apiKey,
  modelName
};
