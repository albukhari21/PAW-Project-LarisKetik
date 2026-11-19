// services/promptBuilder.js

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

const promptBuilder = {
  /**
   * Menyusun system instruction dan prompt untuk pembuatan caption promosi
   */
  buildCaptionPrompt: ({ product, platform, gaya, catatan }) => {
    const platformLower = (platform || 'whatsapp').toLowerCase();
    const gayaLower = (gaya || 'santai').toLowerCase();

    // Panduan platform spesifik
    let platformGuide = '';
    if (platformLower === 'whatsapp') {
      platformGuide = `PLATFORM: WHATSAPP BROADCAST / STATUS
- Format: Pesan siaran singkat, rapi, dan nyaman dibaca di layar HP.
- Unsur wajib: Headline menarik dengan emoji secukupnya (🌿🍵✨), nama produk (${product.nama_produk}), ukuran (${product.ukuran}), harga (${formatRupiah(product.harga)}), status stok (${product.stok > 0 ? `Tersedia ${product.stok} porsi` : 'Stok terbatas'}), keunggulan alami/rasa, dan ajakan bertindak (CTA) untuk membalas pesan WhatsApp atau klik link pemesanan.`;
    } else if (platformLower === 'instagram') {
      platformGuide = `PLATFORM: INSTAGRAM FEED / CAROUSEL CAPTION
- Format: Gaya bercerita (storytelling), paragraf-paragraf pendek dengan spasi jeda yang rapi, sentuhan nilai kearifan herbal nusantara.
- Unsur wajib: Kalimat pembuka (hook) yang menggugah selera atau rasa lelah setelah beraktivitas, penjelasan rasa (${product.rasa}) & khasiat tradisional (${product.manfaat_tradisional}), harga (${formatRupiah(product.harga)}), CTA (cek link di bio / DM Bu Wati), dan WAJIB sertakan 5–8 hashtag relevan di akhir (misal: #SeduhRimba #JamuTradisional #KunyitAsam #MinumanHerbal #HidupSehatAlami #UMKMJogja).`;
    } else if (platformLower === 'tiktok') {
      platformGuide = `PLATFORM: TIKTOK VIDEO CAPTION & SCRIPT HOOK
- Format: Sangat singkat, energik, padat, dan langsung ke inti (straight to the point).
- Unsur wajib: Kalimat hook mengejutkan/menggugah di awal ("Pernah ngerasa badan gampang drop?", "Capek kerja tapi pengen seger alami?"), sebutkan ${product.nama_produk} dengan harga ramah kantong (${formatRupiah(product.harga)}), CTA singkat ("Yuk cobain sekarang, tap link di bio!"), dan 3–5 hashtag singkat (#jamu #herbal #seduhrimba #kulinerjogja).`;
    } else {
      platformGuide = `PLATFORM UMUM:
- Buat caption promosi yang memikat, informatif, dan persuasif.`;
    }

    // Panduan gaya penulisan
    let styleGuide = '';
    if (gayaLower === 'formal') {
      styleGuide = `GAYA BAHASA: FORMAL & ELEGAN
- Gunakan bahasa Indonesia yang baku, sopan, bernada terpercaya, mengedepankan kualitas rempah murni dan kebersihan standar dapur Bu Wati.`;
    } else if (gayaLower === 'promo') {
      styleGuide = `GAYA BAHASA: PROMO & DISKON (URGENCY)
- Gunakan bahasa yang memicu urgensi belanja (FOMO), fokus pada penawaran menarik, stok terbatas, atau kesegaran racikan harian.`;
    } else {
      styleGuide = `GAYA BAHASA: SANTAI, AKRAB & HANGAT
- Gunakan nada bahasa yang bersahabat, seperti rekomendasi seorang ibu atau teman yang peduli kesehatan, santai namun tetap sopan.`;
    }

    // Catatan tambahan jika ada
    let noteText = '';
    if (catatan && catatan.trim()) {
      noteText = `\nCATATAN KHUSUS DARI PEMILIK (BU WATI):\n"${catatan.trim()}" (Wajib diintegrasikan secara luwes ke dalam caption!)`;
    }

    // Prompt gabungan
    const systemInstruction = `Kamu adalah Creative Copywriter spesialis UMKM Kuliner & Minuman Herbal lokal untuk brand "Seduh Rimba".

TUGAS UTAMA:
Meracik TAKARIR (CAPTION) PROMOSI yang sangat menarik, persuasif, dan siap publikasi untuk produk Seduh Rimba.

GUARDRAILS KETAT:
1. HANYA gunakan data produk yang tercantum. Jangan mengarang harga, ukuran, atau bahan di luar yang diberikan.
2. DILARANG membuat klaim penyembuhan penyakit secara medis (misal menyembuhkan kanker, diabetes). Gunakan frasa "secara tradisional membantu..." bila menyebut khasiat.
3. Hasilkan HANYA teks caption promosi lengkap siap pakai, TANPA kata pengantar seperti "Berikut adalah caption untuk WhatsApp:" atau basa-basi penutup. Langsung berikan isi teksnya!`;

    const userPrompt = `Tolong buatkan caption promosi dengan rincian berikut:

DATA PRODUK SEDUH RIMBA:
- Nama Produk: ${product.nama_produk}
- Kategori: ${product.nama_kategori || 'Herbal'}
- Ukuran: ${product.ukuran}
- Harga: ${formatRupiah(product.harga)}
- Stok Saat Ini: ${product.stok}
- Komposisi: ${product.komposisi}
- Khasiat Tradisional: ${product.manfaat_tradisional}
- Profil Rasa: ${product.rasa}
- Cara Penyajian: ${product.cara_penyajian}
- Daya Simpan: ${product.masa_simpan}

${platformGuide}
${styleGuide}
${noteText}

Berikan langsung teks caption promosi terbaikmu!`;

    return { systemInstruction, userPrompt };
  }
};

module.exports = promptBuilder;
