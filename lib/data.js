// Data contoh (mock). Di tahap berikutnya diganti data nyata dari database/API.
export const workspaces = {
  agency: {
    id: "agency", name: "Creative Agency", accent: "#B8336A", soft: "#F8E6EE",
    stages: [
      { id: "brief", label: "Brief" }, { id: "pm", label: "Perencanaan" },
      { id: "creative", label: "Kreatif" }, { id: "editor", label: "Editing" },
      { id: "approval", label: "Persetujuan", human: true },
      { id: "publisher", label: "Posting" }, { id: "analyst", label: "Analisa" },
    ],
    agents: [
      { id: "brief", name: "Brief Agent", status: "aktif", done: 18, desc: "Mengubah pesan klien menjadi brief terstruktur: tujuan, audiens, deadline, deliverable." },
      { id: "pm", name: "PM Agent", status: "aktif", done: 42, desc: "Memecah brief jadi task, mengatur prioritas, dan mengingatkan deadline." },
      { id: "creative", name: "Creative Agent", status: "aktif", done: 57, desc: "Membuat ide konten, caption, dan naskah sesuai tone brand klien." },
      { id: "editor", name: "Editor Agent", status: "menunggu", done: 33, desc: "Merapikan teks dan menyiapkan desain dari template." },
      { id: "publisher", name: "Publisher Agent", status: "idle", done: 29, desc: "Menjadwalkan dan memposting konten yang sudah disetujui." },
      { id: "analyst", name: "Analyst Agent", status: "idle", done: 12, desc: "Menyusun laporan performa mingguan per klien." },
    ],
    items: [
      { id: 1, title: "Kampanye Ramadan - Kopi Nusa", stage: "brief", meta: "Klien: Kopi Nusa" },
      { id: 2, title: "Rebranding logo Toko Batik Sari", stage: "pm", meta: "Deadline 28 Nov" },
      { id: 3, title: "10 ide Reels produk skincare", stage: "creative", meta: "Klien: GlowUp" },
      { id: 4, title: "Caption promo Harbolnas", stage: "creative", meta: "Klien: Mode Kita" },
      { id: 5, title: "Carousel edukasi kesehatan gigi", stage: "editor", meta: "Klien: Klinik Senyum" },
      { id: 6, title: "Poster grand opening cabang 2", stage: "approval", meta: "Menunggu Anda" },
      { id: 7, title: "Feed Instagram minggu ke-3", stage: "publisher", meta: "Terjadwal Sabtu 19.00" },
      { id: 8, title: "Laporan performa Oktober", stage: "analyst", meta: "Klien: Kopi Nusa" },
    ],
    activity: [
      { time: "16.42", agent: "Creative Agent", text: "Menyelesaikan 10 ide Reels untuk GlowUp" },
      { time: "16.10", agent: "PM Agent", text: "Memecah brief Batik Sari menjadi 6 task" },
      { time: "15.55", agent: "Brief Agent", text: "Brief baru dari Kopi Nusa siap ditinjau" },
      { time: "15.20", agent: "Publisher Agent", text: "Menjadwalkan 4 postingan untuk Mode Kita" },
    ],
    weekly: [4, 7, 5, 9, 8, 12, 6],
    unit: "konten selesai",
  },
  media: {
    id: "media", name: "Media Lokal", accent: "#0F766E", soft: "#DDF1EE",
    stages: [
      { id: "scout", label: "Pantau" }, { id: "writer", label: "Penulisan" },
      { id: "guard", label: "Pemeriksaan" }, { id: "approval", label: "Persetujuan", human: true },
      { id: "publisher", label: "Terbit" }, { id: "analyst", label: "Analisa" },
    ],
    agents: [
      { id: "scout", name: "Scout Agent", status: "aktif", done: 126, desc: "Memantau RSS dan kanal resmi, lalu mendeteksi topik yang layak diangkat." },
      { id: "writer", name: "Writer Agent", status: "aktif", done: 94, desc: "Menulis ulang fakta menjadi artikel orisinal dengan judul SEO dan sumber." },
      { id: "guard", name: "Guard Agent", status: "menunggu", done: 90, desc: "Memeriksa duplikasi, nama, angka, dan kelayakan sebelum terbit." },
      { id: "publisher", name: "Publisher Agent", status: "idle", done: 71, desc: "Menerbitkan ke website dan membagikan ke media sosial." },
      { id: "analyst", name: "Analyst Agent", status: "idle", done: 14, desc: "Menunjukkan artikel terpopuler dan jam terbaik untuk terbit." },
    ],
    items: [
      { id: 1, title: "Pemkot Manado tambah rute angkot baru", stage: "scout", meta: "Sumber: RSS pemkot" },
      { id: 2, title: "Harga cabai rawit naik di pasar Bersehati", stage: "scout", meta: "Trending lokal" },
      { id: 3, title: "Festival Bunaken 2026 dibuka akhir pekan ini", stage: "writer", meta: "412 kata" },
      { id: 4, title: "Jadwal perbaikan jalan Boulevard", stage: "guard", meta: "Cek duplikasi" },
      { id: 5, title: "Hasil Liga 3 Sulut pekan ke-8", stage: "approval", meta: "Menunggu Anda" },
      { id: 6, title: "Cuaca ekstrem peringatan BMKG Sulut", stage: "publisher", meta: "Terbit 17.05" },
      { id: 7, title: "Ringkasan berita pekan lalu", stage: "analyst", meta: "28 artikel" },
    ],
    activity: [
      { time: "17.05", agent: "Publisher Agent", text: "Menerbitkan: Cuaca ekstrem peringatan BMKG Sulut" },
      { time: "16.48", agent: "Guard Agent", text: "Menandai 1 artikel mirip sumber asli, perlu ditulis ulang" },
      { time: "16.30", agent: "Writer Agent", text: "Draf Festival Bunaken 2026 selesai (412 kata)" },
      { time: "16.02", agent: "Scout Agent", text: "Menemukan 9 topik baru dari 14 sumber" },
    ],
    weekly: [11, 14, 9, 16, 13, 8, 10],
    unit: "artikel terbit",
  },
};
export const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
