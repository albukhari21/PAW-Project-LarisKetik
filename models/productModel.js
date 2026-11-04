// Array statis data produk UMKM
const products = [
  {
    id: 1,
    namaProduk: "Paket Snack Box Gurih Barokah",
    pemilik: "Asep Kopling (Katering & Snack)",
    targetMedia: "Status WhatsApp",
    harga: 15000,
    keunggulan: "Isian 3 kue premium + air mineral, higienis, rasa otentik, gratis antar area kampus",
    captionOtomatis: "🍱 Lagi ada acara rapat, seminar, atau arisan tapi bingung cari snack box yang pas di kantong? Paket Snack Box Gurih Barokah solusinya! Cuma 15rb/pax udah dapet 3 kue premium + air mineral. Higienis, fresh, dan siap antar tepat waktu! Pesan sekarang via WA yuk sebelum slot harian penuh! ✨"
  },
  {
    id: 2,
    namaProduk: "Kaos Oversize Streetwear Local Pride",
    pemilik: "Rijal Aquarium (Distro Lokal)",
    targetMedia: "Instagram / Facebook",
    harga: 110000,
    keunggulan: "Bahan Cotton Combed 24s adem, sablon plastisol awet tidak pecah, potongan drop-shoulder modern",
    captionOtomatis: "🔥 UPGRADE GAYA LO HARI INI! Masih pakai kaos yang gerah dan gampang melar? Kenalin Kaos Oversize Streetwear Local Pride. Dibuat dengan Cotton Combed 24s yang adem maksimal plus sablon plastisol anti pecah. Bikin look harian lo makin standout! Klik link bio buat checkout sekarang sebelum kehabisan size! 🚀 #LocalPride #StreetwearIndo #KaosOversize"
  },
  {
    id: 3,
    namaProduk: "Keripik Pisang Lumer Cokelat Meleleh",
    pemilik: "Cecep Sumedang (Camilan Rumahan)",
    targetMedia: "Status WhatsApp",
    harga: 18000,
    keunggulan: "Irisan pisang renyah tebal, lumeran dark chocolate manis legit melimpah, kemasan pouch ziplock kedap udara",
    captionOtomatis: "🍌 Sore-sore gini paling enak ngemil yang manis legit! Cobain Keripik Pisang Lumer Cokelat Meleleh dari Cecep Snack. Renyahnya pisang berpadu sama lelehan cokelat premium yang melimpah banget. Siap temenin nugas atau santai kamu. Langsung ketik 'MAU KERIPIK' di balasan status ini ya, stok terbatas! 🍫😋"
  }
];

const ProductModel = {
  // Mengambil semua data produk
  getAll: () => {
    return products;
  },

  // Mengambil data produk berdasarkan ID
  getById: (id) => {
    return products.find(p => p.id === parseInt(id));
  }
};

module.exports = ProductModel;