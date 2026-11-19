-- ============================================================
-- SEED DATA: SEDUH RIMBA (UMKM Jamu & Minuman Herbal Lokal)
-- Database Engine: PostgreSQL 18 (Dikelola via pgAdmin 4)
-- ============================================================

-- 1. SEED KATEGORI (4 Kategori)
INSERT INTO kategori (id, nama_kategori, deskripsi) VALUES
(1, 'Minuman Botol', 'Minuman jamu segar cair siap minum dalam kemasan botol higienis.'),
(2, 'Sachet / Seduh', 'Racikan herbal kering dan sachet seduh praktis untuk diseduh dengan air panas.'),
(3, 'Serbuk', 'Bubuk herbal murni pilihan dari rimpang asli tanpa bahan kimia tambahan.'),
(4, 'Paket Hadiah', 'Bingkisan dan hampers sehat kemasan anyaman bambu khas Nusantara untuk kerabat.');

-- Set sequence kategori
SELECT setval('kategori_id_seq', (SELECT MAX(id) FROM kategori));

-- 2. SEED PRODUK (8 Produk Realistis Seduh Rimba)
INSERT INTO produk (
    id, kategori_id, nama_produk, slug, deskripsi, komposisi, manfaat_tradisional, rasa, 
    cara_penyajian, cara_penyimpanan, masa_simpan, peringatan, ukuran, harga, stok, 
    foto_url, is_unggulan, status
) VALUES
(
    1, 1, 'Kunyit Asam Segar 250 ml', 'kunyit-asam-segar-250ml',
    'Minuman sari kunyit asam segar warisan resep keluarga Bu Wati. Diramu dari rimpang kunyit basah pilihan dan asam jawa matang alami tanpa pemanis buatan.',
    'Rimpang kunyit segar, asam jawa matang pohon, gula aren kawung murni, air mineral pegunungan.',
    'Secara tradisional digunakan untuk membantu menyegarkan tubuh yang lelah, meredakan rasa pegal linu, dan membantu melancarkan siklus haid alami.',
    'Asam manis menyegarkan dengan semerbak aroma kunyit asli.',
    'Kocok perlahan sebelum diminum. Sangat nikmat disajikan dalam kondisi dingin dari kulkas.',
    'Wajib disimpan dalam lemari pendingin (kulkas) pada suhu 2°C - 6°C.',
    '7 hari di dalam lemari es (tanpa bahan pengawet sintetik).',
    'Tidak dianjurkan untuk wanita hamil pada trimester pertama tanpa konsultasi tenaga kesehatan.',
    'Botol 250 ml', 14000.00, 28,
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    TRUE, 'aktif'
),
(
    2, 1, 'Beras Kencur Hangat 250 ml', 'beras-kencur-hangat-250ml',
    'Minuman beras kencur kental beraroma khas yang menghangatkan badan dan cocok diminum di sore hari setelah lelah beraktivitas kantor.',
    'Rimpang kencur segar wangi, beras sangrai pilihan ditumbuk halus, jahe merah, kapulaga, gula kelapa Jawa, air.',
    'Secara tradisional dipercaya membantu meredakan masuk angin, menghangatkan rongga dada, dan memulihkan stamina harian.',
    'Manis lembut gurih beras dengan sensasi hangat pedas kencur yang khas.',
    'Dapat dinikmati langsung dingin atau dihangatkan dengan merendam botol dalam air hangat 5 menit.',
    'Simpan dalam lemari pendingin (suhu 2°C - 6°C). Segera habiskan setelah tutup segel dibuka.',
    '7 hari di dalam kulkas.',
    'Aman dikonsumsi harian dalam batas takaran wajar bagi dewasa dan remaja.',
    'Botol 250 ml', 14000.00, 32,
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    TRUE, 'aktif'
),
(
    3, 2, 'Wedang Jahe Merah Sachet (Isi 10)', 'wedang-jahe-merah-sachet-10',
    'Racikan serbuk seduh jahe merah murni berpadu rempah cengkeh dan serai. Solusi praktis menghangatkan tubuh di kantor saat cuaca hujan atau ber-AC dingin.',
    'Ekstrak jahe merah tua, cengkeh wangi, kayu manis, serai wangi, gula tebu alami.',
    'Secara tradisional berkhasiat membantu meredakan perut kembung, meredakan gejala masuk angin ringan, dan menghangatkan tubuh.',
    'Pedas mantap menghangatkan dengan keharuman rempah aromatik Nusantara.',
    'Seduh 1 sachet ke dalam 150 ml air mendidih, aduk merata dan nikmati selagi hangat.',
    'Simpan di tempat kering, sejuk, dan terlindung dari paparan cahaya matahari langsung.',
    '12 bulan pada kemasan bersegel rapi.',
    'Bagi penderita tukak lambung atau maag akut, disarankan mengonsumsi setelah makan.',
    'Kotak isi 10 sachet @20g', 50000.00, 45,
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    TRUE, 'aktif'
),
(
    4, 3, 'Temulawak Serbuk Alami 100 g', 'temulawak-serbuk-alami-100g',
    'Murni 100% rimpang temulawak pilihan tanah Jawa Tengah yang dikeringkan higienis dan digiling halus tanpa tambahan tepung pati atau zat pewarna.',
    '100% rimpang temulawak murni pilihan (Curcuma xanthorrhiza).',
    'Secara tradisional digunakan untuk membantu menjaga kesehatan fungsi hati, memperbaiki selera makan, dan melancarkan sistem pencernaan.',
    'Pahit aromatik khas jamu murni dengan aroma rempah tanah yang menenangkan.',
    'Seduh 1 sendok teh (5 g) serbuk dengan 200 ml air hangat. Dapat ditambahkan 1 sendok makan madu alami untuk menyeimbangkan rasa.',
    'Tutup rapat klip ziplock kemasan pouch setelah digunakan, letakkan di tempat kering.',
    '8 bulan di tempat kedap udara.',
    'Tidak dianjurkan untuk orang dengan riwayat batu empedu atau obstruksi saluran empedu tanpa pengawasan medis.',
    'Pouch ziplock 100 g', 35000.00, 20,
    'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    FALSE, 'aktif'
),
(
    5, 2, 'Gula Asam Tubruk Rempah (Isi 5)', 'gula-asam-tubruk-rempah',
    'Kombinasi klasik asam jawa dengan gula aren kental serta sentuhan kayu manis untuk diseduh tubruk. Menyegarkan tenggorokan setelah seharian bekerja.',
    'Daging buah asam jawa matang, gula aren kawung, kayu manis serut, daun pandan kering.',
    'Secara tradisional bermanfaat membantu melegakan tenggorokan yang serak dan membantu melancarkan metabolisme tubuh.',
    'Manis legit asam segar yang seimbang dan nikmat.',
    'Masukkan 1 kantong tubruk ke cangkir, tuangkan 180 ml air panas mendidih, diamkan 3 menit sebelum diminum.',
    'Simpan pada suhu ruang kering dalam wadah tertutup rapat.',
    '6 bulan.',
    'Perhatikan batas konsumsi gula aren harian terutama bagi penderita intoleransi gula atau diabetes.',
    'Pack isi 5 kantong seduh', 38000.00, 25,
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    FALSE, 'aktif'
),
(
    6, 1, 'Empon-Empon Imun Booster 250 ml', 'empon-empon-imun-booster-250ml',
    'Kombinasi lengkap 5 rimpang berkhasiat Nusantara yang dimasak perlahan (slow brew) dengan madu hutan asli untuk memelihara vitalitas keluarga.',
    'Temulawak, kunyit, jahe emprit, serai wangi, kayu manis, madu hutan Sumbawa, air.',
    'Secara tradisional digunakan untuk membantu memelihara daya tahan tubuh alami dan membantu meredakan keletihan fisik.',
    'Rempah pekat mantap berpadu rasa manis lembut madu hutan asli.',
    'Kocok perlahan, minum langsung setengah atau satu botol setiap pagi sebelum sarapan.',
    'Wajib selalu disimpan di lemari es (suhu 2°C - 5°C).',
    '5 hari di dalam lemari es (fresh brew tanpa pengawet).',
    'Konsultasikan dengan dokter spesialis bila sedang menjalani terapi obat-obatan medis rutin tertentu.',
    'Botol 250 ml', 16000.00, 15,
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    TRUE, 'aktif'
),
(
    7, 3, 'Kencur Bubuk Murni 80 g', 'kencur-bubuk-murni-80g',
    'Bubuk kencur murni dengan aroma wangi tajam yang khas. Praktis untuk campuran minuman seduhan hangat maupun bumbu sehat harian keluarga.',
    '100% rimpang kencur segar pilihan dikeringkan dan digiling higienis.',
    'Secara tradisional digunakan untuk membantu meredakan batuk ringan, menghangatkan tenggorokan, dan mengurangi rasa lelah.',
    'Pedas segar aromatik khas kencur asli.',
    'Seduh 1/2 sendok teh dengan segelas air hangat atau campurkan ke dalam seduhan teh hangat favorit Anda.',
    'Simpan dalam toples kaca kedap udara pada ruangan sejuk dan kering.',
    '10 bulan.',
    'Pastikan menggunakan sendok kering saat mengambil bubuk agar serbuk tidak menggumpal.',
    'Jar kaca 80 g', 28000.00, 22,
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    FALSE, 'aktif'
),
(
    8, 4, 'Paket Hadiah Sehat Rimba (Hampers Besek)', 'paket-hadiah-sehat-rimba',
    'Paket bingkisan tanda kasih berisi aneka jamu botol segar dan seduhan herbal Seduh Rimba, dikemas cantik dalam besek anyaman bambu dengan kartu ucapan.',
    '1 btl Kunyit Asam 250ml, 1 btl Beras Kencur 250ml, 1 kotak Wedang Jahe Merah, 1 pouch Temulawak 100g, besek bambu dan kartu doa sehat.',
    'Secara tradisional dipersembahkan sebagai hantaran tulus untuk mendoakan kebugaran, kesehatan, dan pemulihan stamina kerabat tersayang.',
    'Beraneka cita rasa herbal Nusantara: dari manis asam menyegarkan hingga hangat menenangkan.',
    'Produk botol segera dimasukkan ke kulkas saat paket sampai; produk kering siap disimpan di ruang saji.',
    'Simpan botol di lemari es (2-6°C), produk kering di suhu ruang.',
    'Sesuai tanggal kedaluwarsa masing-masing produk di dalam kemasan.',
    'Disarankan menggunakan kurir instan/same day delivery untuk menjaga kesegaran minuman botol.',
    'Besek anyaman bambu premium', 135000.00, 10,
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    TRUE, 'aktif'
);

-- Set sequence produk
SELECT setval('produk_id_seq', (SELECT MAX(id) FROM produk));

-- 3. SEED CAPTION CONTOH DI CAPTION_LOG
INSERT INTO caption_log (produk_id, platform, gaya, isi_caption) VALUES
(
    1, 'whatsapp', 'santai',
    'Siang-siang gerah bikin badan lemas? ☀️ Segarkan harimu dengan Kunyit Asam Segar Seduh Rimba! Dibuat dari kunyit segar dan asam jawa asli tanpa pemanis buatan. Cuma Rp14.000/botol. Pesan sekarang via WA yuk sebelum stok harian habis! 🌿✨'
),
(
    3, 'instagram', 'cerita',
    'Menatap layar laptop berjam-jam di ruangan ber-AC sering bikin badan meriang dan perut kembung? 🌧️💻\n\nKenalkan Wedang Jahe Merah dari Seduh Rimba. Diracik dari jahe merah tua dan rempah Nusantara pilihan untuk memberi kehangatan alami di setiap tegukan.\n\n✅ 100% Alami & Tanpa Pengawet\n✅ Praktis tinggal seduh di kantor atau rumah\n💰 Rp50.000 (Isi 10 sachet)\n\nYuk rawat kesehatanmu hari ini. Klik link di bio untuk pemesanan! 🌿\n\n#SeduhRimba #JamuNusantara #JaheMerah #HidupSehatAlami #HerbalIndonesia'
);
