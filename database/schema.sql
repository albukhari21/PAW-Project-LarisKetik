-- ============================================================
-- SKEMA DATABASE: SEDUH RIMBA (UMKM Jamu & Minuman Herbal)
-- Database Engine: PostgreSQL 18 (Dikelola via pgAdmin 4)
-- ============================================================

DROP TABLE IF EXISTS caption_log CASCADE;
DROP TABLE IF EXISTS produk CASCADE;
DROP TABLE IF EXISTS kategori CASCADE;

-- 1. TABEL KATEGORI
CREATE TABLE kategori (
    id SERIAL PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL,
    deskripsi TEXT
);

-- 2. TABEL PRODUK
CREATE TABLE produk (
    id SERIAL PRIMARY KEY,
    kategori_id INT NOT NULL REFERENCES kategori(id) ON DELETE RESTRICT,
    nama_produk VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    deskripsi TEXT NOT NULL,
    komposisi TEXT NOT NULL,
    manfaat_tradisional TEXT NOT NULL,
    rasa VARCHAR(100) NOT NULL,
    cara_penyajian TEXT NOT NULL,
    cara_penyimpanan VARCHAR(255) NOT NULL,
    masa_simpan VARCHAR(150) NOT NULL,
    peringatan VARCHAR(255) NOT NULL,
    ukuran VARCHAR(100) NOT NULL,
    harga NUMERIC(12, 2) NOT NULL,
    stok INT NOT NULL DEFAULT 0,
    foto_url VARCHAR(255) NOT NULL,
    is_unggulan BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL RIWAYAT CAPTION LOG
CREATE TABLE caption_log (
    id SERIAL PRIMARY KEY,
    produk_id INT NOT NULL REFERENCES produk(id) ON DELETE CASCADE,
    platform VARCHAR(20) NOT NULL CHECK (platform IN ('whatsapp', 'instagram', 'tiktok')),
    gaya VARCHAR(50) NOT NULL,
    isi_caption TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indeks Tambahan untuk Optimasi Query Pencarian dan Filter
CREATE INDEX idx_produk_slug ON produk(slug);
CREATE INDEX idx_produk_status ON produk(status);
CREATE INDEX idx_produk_kategori ON produk(kategori_id);
CREATE INDEX idx_produk_unggulan ON produk(is_unggulan);
