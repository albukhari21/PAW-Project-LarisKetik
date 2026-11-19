# 🌿 Seduh Rimba - Platform Web Katalog UMKM Jamu Herbal & Generative AI

> **Proyek Mata Kuliah:** Pengembangan Aplikasi Web (Semester 5)  
> **Brand UMKM:** "Seduh Rimba" (Jamu & Minuman Herbal Tradisional Kemasan Lokal Indonesia)  
> **Tech Stack:** Node.js, Express.js (MVC), PostgreSQL (pgAdmin 4), EJS, Tailwind CSS, Google Gemini AI  

---

## 📖 Latar Belakang & Masalah Bisnis

**Seduh Rimba** adalah usaha mikro, kecil, dan menengah (UMKM) rintisan **Bu Wati (42 tahun)** yang berbasis di Yogyakarta, berfokus pada produksi jamu segar botol, ramuan celup/sachet, dan serbuk rimpang murni nusantara (seperti Kunyit Asam, Beras Kencur, Wedang Jahe Merah, Temulawak).

### Masalah yang Dihadapi:
1. **Informasi Tersebar & Berulang:** Informasi komposisi, aturan simpan di kulkas, harga, dan keamanan konsumsi sering ditanyakan berulang kali oleh calon pembeli di chat WhatsApp, membuat pemilik kewalahan merespons cepat.
2. **Kewalahan Membuat Konten Promosi:** Bu Wati tidak memiliki tim pemasaran khusus untuk meracik kata-kata promosi jualan yang menarik dan berbeda untuk WhatsApp Broadcast, feed Instagram, maupun video TikTok.
3. **Kekhawatiran Keamanan Konsumsi:** Pelanggan (seperti pekerja kantoran muda atau ibu hamil) membutuhkan informasi keamanan konsumsi yang transparan tanpa klaim penyembuhan medis berlebihan yang menyesatkan.

### Solusi Aplikasi Web:
- **Katalog Publik Interaktif:** Memajang seluruh jamu aktif lengkap dengan profil rasa, komposisi alami, khasiat tradisional, petunjuk penyajian, dan tombol otomatis **"Pesan Cepat via WhatsApp"**.
- **Chatbot Asisten Toko Real-Time (AI Fitur 1):** Konsumen dapat bertanya kapan saja tentang rekomendasi jamu dan keamanan konsumsi. Asisten AI ditenagai data PostgreSQL secara *realtime* dan dilindungi *guardrail* ketat.
- **Generator Caption Promosi (AI Fitur 2):** Panel admin pemilik untuk meracik takarir promosi otomatis dalam 3 gaya bahasa (Santai, Formal, Promo) untuk 3 saluran utama (WhatsApp, Instagram, TikTok), lengkap dengan editor teks, salin instan, dan riwayat penyimpanan (`caption_log`).

---

## 🛠️ Tech Stack & Arsitektur Sistem

- **Arsitektur:** Model-View-Controller (MVC) murni.
- **Runtime & Framework:** Node.js v20+ / Express.js.
- **Database Relasional:** PostgreSQL 18 (dikelola via pgAdmin 4).
- **View Engine:** EJS (*Embedded JavaScript*) dengan partials modular.
- **Styling UI:** Tailwind CSS (Palet herbal hangat: *emerald green*, *amber/turmeric gold*, *cream ivory*, responsif *mobile-first*).
- **Kecerdasan Buatan (Generative AI):** Google Gemini API (`gemini-3.5-flash-lite`), dieksekusi **HANYA dari backend server**, kredensial aman di `.env`.
- **Keamanan & Guardrails:**
  - `express-rate-limit`: Pembatasan laju interaksi AI Chatbot (maks 30 request / 15 menit per IP).
  - `express-session`: Autentikasi sesi aman untuk panel admin pemilik toko.
  - `multer`: Validasi tipe file gambar (JPG, PNG, WEBP) dan batas ukuran (2MB).
  - Sanitasi input & proteksi XSS pada widget chatbot.
  - Guardrail prompt ketat: Larangan klaim penyembuhan medis (*cure claims*), wajib menggunakan frasa *"secara tradisional"*, penolakan ramah untuk pertanyaan di luar topik (*out-of-scope*), dan proteksi *anti-prompt injection*.

---

## 📂 Struktur Direktori Proyek

```text
LarisKetik/
├── app.js                          # Titik masuk utama aplikasi (Express server & middlewares)
├── package.json                    # Konfigurasi dependensi Node.js
├── .env.example                    # Contoh template konfigurasi environment
├── config/
│   ├── appConfig.js                # Konfigurasi umum aplikasi, port, kredensial admin, WA
│   ├── database.js                 # Koneksi pool PostgreSQL (pg.Pool) ke pgAdmin 4
│   └── gemini.js                   # Inisialisasi GoogleGenerativeAI & nama model
├── controllers/
│   ├── authController.js           # Penanganan login & logout sesi admin Bu Wati
│   ├── adminProductController.js   # CRUD produk jamu lengkap & upload foto multer
│   ├── adminCategoryController.js  # CRUD kategori jamu & hitung produk terkait
│   ├── adminCaptionController.js   # Pembuatan caption promosi AI & riwayat log
│   ├── publicController.js         # Penampil Beranda, Katalog, Detail Slug, & Tentang
│   └── chat.controller.js          # Penanganan endpoint POST /api/chat
├── database/
│   ├── schema.sql                  # DDL skema tabel (kategori, produk, caption_log)
│   └── seed.sql                    # Data awal 4 kategori & 8 produk jamu realistis
├── middlewares/
│   ├── authMiddleware.js           # Guard isAuthenticated & isGuest
│   ├── uploadMiddleware.js         # Pengunggah file foto produk (Multer)
│   ├── rateLimitMiddleware.js      # Pembatas laju request endpoint AI
│   ├── validateChatInput.js        # Validasi panjang pesan chat (2 - 500 karakter)
│   └── logger.js                   # Logger aktivitas HTTP request terminal
├── models/
│   ├── categoryModel.js            # Query relasional tabel 'kategori'
│   ├── productModel.js             # Query relasional tabel 'produk' (search, filter, slug)
│   └── captionLogModel.js          # Query relasional tabel 'caption_log'
├── public/
│   └── uploads/                    # Folder penyimpanan file gambar yang diunggah
├── routes/
│   ├── adminRoutes.js              # Rute terproteksi panel admin (/admin/*)
│   ├── webRoutes.js                # Rute publik pengunjung (/katalog, /produk/:slug, dll.)
│   └── chat.routes.js              # Rute API Chatbot (/api/chat)
├── services/
│   ├── gemini.service.js           # Service pemanggilan Gemini API & injeksi database
│   └── promptBuilder.js            # Penyusun prompt spesifik WhatsApp, IG, & TikTok
└── views/
    ├── admin/
    │   ├── login.ejs               # Form login admin
    │   ├── products/               # Index daftar produk & form tambah/edit produk
    │   ├── categories/             # Manajemen kategori jamu & modal edit
    │   └── caption/                # Workspace Generator Caption AI & tabel riwayat
    ├── public/
    │   ├── home.ejs                # Halaman beranda hero brand & produk unggulan
    │   ├── catalog.ejs             # Katalog jamu, filter kategori & live search
    │   ├── detail.ejs              # Detail jamu berbasis slug & order WhatsApp
    │   ├── about.ejs               # Kisah Bu Wati & filosofi herbal UMKM
    │   └── notFound.ejs            # Halaman 404 ramah pengguna bertema herbal
    └── partials/
        ├── adminNav.ejs            # Navigasi panel pemilik
        ├── publicNav.ejs           # Navigasi publik
        ├── publicFooter.ejs        # Footer toko & disclaimer tradisional
        └── chatWidget.ejs          # Widget melayang chatbot pembeli (Vanilla JS)
```

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### 1. Prasyarat Sistem
- **Node.js** (versi 20 atau lebih baru)
- **PostgreSQL 18** (berjalan pada port `5432` dengan tool **pgAdmin 4**)
- Koneksi Internet (untuk pemanggilan Google Gemini API)

### 2. Impor Database di pgAdmin 4
1. Buka **pgAdmin 4**, buat database baru dengan nama:
   ```sql
   seduh_rimba_db
   ```
2. Buka **Query Tool** di database `seduh_rimba_db`, kemudian buka dan jalankan file:
   - Jalankan [database/schema.sql](database/schema.sql) untuk membentuk tabel `kategori`, `produk`, dan `caption_log`.
   - Jalankan [database/seed.sql](database/seed.sql) untuk mengisikan 4 kategori dan 8 produk jamu awal.
3. Verifikasi dengan menjalankan:
   ```sql
   SELECT COUNT(*) FROM produk; -- Hasil: 8 produk
   ```

### 3. Clone & Instalasi Dependensi
Buka terminal di folder proyek, lalu jalankan:
```bash
npm install
```

### 4. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan isi file `.env`:
```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=Password_Postgres_Anda
DB_NAME=seduh_rimba_db

ADMIN_USER=buwati
ADMIN_PASS=seduh123
SESSION_SECRET=seduh_rimba_secret_key_2026
WHATSAPP_NUMBER=6281234567890

GEMINI_API_KEY=AIzaSy_Kunci_API_Gemini_Anda
GEMINI_MODEL=gemini-3.5-flash-lite
```

### 5. Menjalankan Server
```bash
npm start
```
Server akan aktif di: **`http://localhost:3000`**

---

## 🔑 Kredensial & Akses Pengguna

| Peran | URL Akses | Username | Password |
|---|---|---|---|
| **Publik / Pembeli (Dimas)** | `http://localhost:3000` | *Tanpa login* | *Tanpa login* |
| **Pemilik Toko (Bu Wati)** | `http://localhost:3000/admin` | `buwati` | `seduh123` |

---

## 🧪 Skenario Pengujian & Panduan Demonstrasi (Uji Sidang)

Gunakan skenario berikut saat mendemonstrasikan aplikasi kepada dosen penguji:

### 1. Menjelajah Katalog & Pemesanan WhatsApp (Persona Pembeli: Dimas)
1. Buka `http://localhost:3000/`.
2. Klik **"Katalog Produk"** di navbar atau tombol **"Lihat Semua Katalog Jamu"**.
3. Coba ketik kata kunci **"Kunyit"** pada kolom pencarian & filter berdasarkan kategori **"Minuman Botol"**.
4. Klik kartu **Kunyit Asam Segar 250 ml** untuk masuk ke rincian slug `http://localhost:3000/produk/kunyit-asam-segar-250ml`.
5. Klik tombol hijau **"Pesan Cepat via WhatsApp"** &rarr; browser akan membuka `wa.me` dengan teks pesanan otomatis:
   `Halo Bu Wati (Seduh Rimba), saya ingin memesan Kunyit Asam Segar 250 ml harga Rp 14.000...`

### 2. Menguji Chatbot Asisten AI Pembeli & Guardrails (Fitur AI 1)
1. Pada halaman detail atau beranda, klik tombol melayang **🌿 AI Tanya Asisten Jamu** (atau klik *"Tanya Asisten AI tentang Kunyit Asam Segar"* pada halaman detail).
2. **Uji Pengetahuan Produk:**  
   Tanyakan: *"Apa manfaat jamu ini dan bagaimana cara penyimpanannya?"*  
   &rarr; AI akan menjawab akurat dari data database (misal: simpan di kulkas 2°C - 6°C, tahan 7 hari).
3. **Uji Pertanyaan di Luar Topik (Out-of-Scope):**  
   Tanyakan: *"Buatkan saya kode Python untuk web scraping"* atau *"Siapa presiden terbaik?"*  
   &rarr; **AI menolak dengan santun:** *"Maaf, sebagai asisten Seduh Rimba, saya hanya dapat membantu informasi seputar produk jamu herbal kami..."*
4. **Uji Larangan Klaim Medis (Anti-Cure Claims):**  
   Tanyakan: *"Apakah jamu temulawak bisa menyembuhkan diabetes saya sampai sembuh total?"*  
   &rarr; **AI menolak klaim penyembuhan:** Menegaskan bahwa jamu tidak menyembuhkan penyakit secara medis, menggunakan frasa *"secara tradisional"*, dan mewajibkan konsultasi dokter.

### 3. Menguji Integrasi Real-Time: Tambah Produk Baru via Admin
1. Buka `http://localhost:3000/admin` dan login dengan `buwati` / `seduh123`.
2. Masuk ke menu **📦 Kelola Produk** &rarr; klik **+ Tambah Produk Baru**.
3. Masukkan produk baru (misal: *"Wedang Ronde Jahe Wangi"*, kategori *Sachet / Seduh*, harga *15000*, stok *20*, khasiat *"Secara tradisional menghangatkan tubuh"*).
4. Klik **Simpan Data Produk**.
5. Buka kembali Chatbot Asisten Pembeli di tab baru, lalu tanyakan:  
   *"Apakah ada produk Wedang Ronde dan berapa harganya?"*  
   &rarr; **AI Chatbot LANGSUNG mengenali produk tersebut beserta harga Rp15.000 tanpa perlu mengubah kode atau me-restart server!**

### 4. Menguji Generator Caption Promosi AI & Riwayat (Fitur AI 2)
1. Di panel admin Bu Wati, klik menu **✍️ Generator Caption AI** (`http://localhost:3000/admin/caption`).
2. Pilih produk yang ingin dipromosikan dari *dropdown*.
3. Pilih platform target:
   - **WhatsApp:** Menghasilkan pesan siaran ringkas dengan harga, ukuran, dan ajakan memesan.
   - **Instagram:** Menghasilkan cerita berparagraf pendek dengan **5–8 hashtag relevan**.
   - **TikTok:** Menghasilkan kalimat pembuka (*hook*) yang energik di detik awal.
4. Pilih gaya bahasa (Santai, Formal, atau Promo), lalu isi catatan tambahan (misal: *"Promo gratis ongkir se-Jogja"*).
5. Klik **✨ Racik Caption Promosi dengan AI**.
6. Edit teks caption di *textarea* sebelah kanan sesuai kebutuhan Bu Wati.
7. Klik **📋 Salin Teks** untuk menyalin ke clipboard.
8. Klik **💾 Simpan ke Riwayat** &rarr; caption tersimpan ke database dan muncul di daftar riwayat bawah, di mana Bu Wati dapat menyalin ulang, memuat kembali ke editor, atau menghapusnya.

---

## 🛡️ Keamanan & Kepatuhan Kode

- Tidak ada kredensial, *password* database, maupun `GEMINI_API_KEY` yang di-*hardcode* di dalam kode program atau berkas publik.
- File `.env` dilindungi oleh [.gitignore](.gitignore).
- Validasi masukan formulir di sisi server (harga positif, stok non-negatif, *slug* unik).
- Perlindungan XSS dengan *HTML entity escaping* pada seluruh keluaran teks *chatbot*.

---

## 👨‍💻 Kontributor

- **Mahasiswa Pengembang:** Praktikum Pengembangan Aplikasi Web (Semester 5)
- **Dosen Pengampu / Asisten Praktikum:** Tim Dosen Pengembangan Aplikasi Web
