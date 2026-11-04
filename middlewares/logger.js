const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Tangkap saat proses response selesai dikirimkan
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;

    // Output log terminal sesuai ketentuan praktikum
    console.log(`[${timestamp}] [LOGGER] ${method} ${url} | Status: ${status} (${duration}ms)`);
  });

  next();
};

module.exports = requestLogger;