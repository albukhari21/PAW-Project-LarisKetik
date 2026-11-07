// controllers/webController.js
const ProductModel = require('../models/productModel');

const webController = {
  getHomePage: async (req, res) => {
    try {
      const products = await ProductModel.getAll();
      res.render('index', { 
        pageTitle: 'LarisKetik - Manajemen Produk & Caption Promosi UMKM',
        products: products || []
      });
    } catch (error) {
      const errorMsg = error.message || error.code || 'Koneksi database gagal';
      res.status(500).send(`
        <div style="font-family: sans-serif; padding: 30px; line-height: 1.6; max-width: 600px; margin: 40px auto; border: 1px solid #fecaca; background: #fff5f5; border-radius: 12px;">
          <h2 style="color: #dc2626; margin-top: 0;">❌ Gagal Memuat Data Database</h2>
          <p><strong>Penyebab:</strong> ${errorMsg}</p>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #fee2e2;">
          <p><strong>Panduan Penyelesaian:</strong></p>
          <ul style="padding-left: 20px;">
            <li>Pastikan modul MySQL di <strong>XAMPP Control Panel</strong> sudah berstatus <strong>Start</strong> (warna hijau).</li>
            <li>Periksa kecocokan data koneksi di file <code>.env</code> (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME).</li>
            <li>Pastikan database <code>larisketik_db</code> dan tabel <code>produk</code> sudah dibuat.</li>
          </ul>
        </div>
      `);
    }
  }
};

module.exports = webController;