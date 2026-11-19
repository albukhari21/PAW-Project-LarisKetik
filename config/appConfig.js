module.exports = {
  port: process.env.PORT || 3000,
  appName: 'Seduh Rimba',
  env: process.env.NODE_ENV || 'development',
  adminUser: process.env.ADMIN_USER || 'buwati',
  adminPass: process.env.ADMIN_PASS || 'seduh123',
  sessionSecret: process.env.SESSION_SECRET || 'seduh_rimba_secret_key_2026',
  whatsappNumber: process.env.WHATSAPP_NUMBER || '6281234567890'
};
