# Orkestra: Dashboard Multi-Agent AI untuk Agency dan Media Lokal

> Status: **Tahap 1 selesai (frontend dengan data contoh)**. Integrasi AI dikerjakan mulai Tahap 2.

## 1. Latar belakang

Dua unit kerja yang saya kelola punya pekerjaan berulang yang menyita waktu:

- **Creative agency**: menerima brief klien, memecahnya jadi tugas, membuat konten, mengedit, memposting, lalu menganalisa hasilnya.
- **Media lokal**: mencari berita, menulis ulang, memeriksa, menerbitkan, lalu menganalisa performa artikel.

Kedua alur ini ternyata berpola sama:

**Input → Olah → Tinjau manusia → Terbit → Analisa → Belajar dari hasil**

Orkestra dibuat sebagai satu dashboard yang mengatur beberapa agent AI untuk mengerjakan pola tersebut, dengan manusia tetap memegang keputusan akhir.

## 2. Tujuan

1. Memangkas pekerjaan manual yang berulang di agency dan media.
2. Memberi satu tampilan untuk memantau posisi setiap pekerjaan.
3. Memastikan tidak ada konten tayang tanpa persetujuan manusia.
4. Memakai alat gratis agar bisa dijalankan tanpa biaya langganan.

## 3. Konsep utama

### Satu platform, dua workspace

Satu sistem melayani dua workspace (Creative Agency dan Media Lokal). Agent yang sifatnya umum, seperti Publisher dan Analyst, dirancang bisa dipakai ulang di keduanya.

### Agent bekerja lewat alur berstatus

Agent tidak saling mengobrol bebas. Setiap item (brief, artikel, konten) punya **status tahap**. Setiap agent hanya mengerjakan item di tahapnya, lalu memindahkannya ke tahap berikutnya. Keuntungannya:

- mudah dilacak: kita selalu tahu item ada di mana,
- hemat kuota AI,
- bila satu agent bermasalah, agent lain tetap berjalan.

### Manusia sebagai gerbang persetujuan

Ada tahap **Persetujuan** sebelum konten diterbitkan. AI bisa salah nama, angka, atau fakta, jadi keputusan tayang tetap di tangan manusia.

## 4. Daftar agent

**Creative Agency**

| Agent | Tugas |
|---|---|
| Brief Agent | Mengubah pesan klien menjadi brief terstruktur |
| PM Agent | Memecah brief menjadi tugas dan mengatur prioritas |
| Creative Agent | Membuat ide, caption, dan naskah |
| Editor Agent | Merapikan teks dan menyiapkan desain dari template |
| Publisher Agent | Menjadwalkan dan memposting |
| Analyst Agent | Menyusun laporan performa |

**Media Lokal**

| Agent | Tugas |
|---|---|
| Scout Agent | Memantau sumber berita dan mendeteksi topik |
| Writer Agent | Menulis ulang fakta menjadi artikel orisinal dengan judul SEO |
| Guard Agent | Memeriksa duplikasi dan kelayakan sebelum terbit |
| Publisher Agent | Menerbitkan dan membagikan artikel |
| Analyst Agent | Menunjukkan artikel terpopuler dan jam terbaik terbit |

## 5. Teknologi

| Bagian | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 14 (App Router, JavaScript) | Frontend dan API route dalam satu proyek |
| Styling | Tailwind CSS | Cepat dan konsisten |
| Ikon | lucide-react | Ringan |
| AI | Google Gemini API (free tier) | Gratis dan mendukung bahasa Indonesia |
| Penyimpanan | Awalnya `localStorage`, bisa dinaikkan ke database | Sederhana untuk tahap awal |

Seluruhnya memakai alat gratis. Batas free tier dapat berubah, jadi perlu dicek ulang saat dipakai.

## 6. Fitur yang sudah ada (Tahap 1)

- Pengganti workspace Media Lokal dan Creative Agency, dengan warna aksen berbeda.
- **Ringkasan**: alur agent berurutan beserta jumlah item per tahap, grafik 7 hari, dan log aktivitas.
- **Agent**: daftar agent, status (aktif, menunggu, idle), dan jumlah tugas selesai.
- **Alur kerja**: papan kolom yang menunjukkan posisi setiap item.
- Tampilan responsif dan mendukung navigasi keyboard.

> Semua data pada Tahap 1 adalah **data contoh** di `lib/data.js`. Belum ada panggilan ke AI maupun integrasi ke website atau media sosial.

## 7. Struktur proyek

```
orkestra/
├── app/
│   ├── layout.js          # kerangka halaman
│   ├── page.js            # Ringkasan
│   ├── agents/page.js     # Daftar agent
│   └── pipeline/page.js   # Alur kerja
├── components/Shell.js    # sidebar dan pengganti workspace
├── lib/data.js            # data contoh
└── .env.example           # tempat kunci API (mulai Tahap 2)
```

## 8. Cara menjalankan

1. Pasang Node.js 18.17 atau lebih baru.
2. `npm install`
3. `npm run dev`
4. Buka `http://localhost:3000`

## 9. Roadmap

| Tahap | Isi | Status |
|---|---|---|
| 1 | Frontend dengan data contoh | Selesai |
| 2 | API route Gemini dan halaman uji agent | Selesai |
| 3 | Writer Agent: topik atau ringkasan menjadi draf artikel dan judul SEO | Rencana |
| 4 | Alur persetujuan: Setujui/Tolak, item berpindah tahap, tersimpan | Rencana |
| 5 | Scout (baca RSS) dan Analyst (ringkasan otomatis) | Rencana |
| Lanjutan | Publisher ke WordPress dan Meta Graph API, notifikasi Telegram | Di luar cakupan awal |

## 10. Keputusan desain dan batasan

- **Hak cipta berita**: Writer Agent menulis ulang berdasarkan fakta dan mencantumkan sumber, bukan menyalin teks.
- **Kuota gratis terbatas**: pekerjaan dijadwalkan bertahap, tidak semua agent dijalankan bersamaan.
- **Tanpa integrasi publikasi (untuk saat ini)**: Publisher belum terhubung ke website atau sosial media, sehingga proyek aman dipakai sebagai demo.
- **Kunci API tidak boleh bocor**: dipanggil dari sisi server (API route) dan disimpan di `.env.local`, yang sudah masuk `.gitignore`.

## 11. Yang saya pelajari dari proyek ini

- Merancang sistem multi-agent yang sederhana: alur berstatus lebih mudah dirawat daripada agent yang saling berkomunikasi bebas.
- Menyeimbangkan otomatisasi dan kontrol manusia.
- Membangun secara bertahap agar tiap langkah bisa diuji dan bug tetap sedikit.
