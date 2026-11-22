# Orkestra - Tahap 2 (Agent terhubung Gemini)

Dashboard multi-agent AI untuk Creative Agency dan Media Lokal. Next.js 14 (App Router, JavaScript) + Tailwind CSS.

## Menjalankan
1. Pastikan Node.js 18.17+ terpasang (`node -v`)
2. `npm install`
3. `npm run dev`
4. Buka http://localhost:3000

Build produksi: `npm run build` lalu `npm start`.

## Struktur
- `app/` halaman (Ringkasan, Agent, Alur kerja)
- `components/Shell.js` sidebar + pengganti workspace
- `lib/data.js` data contoh (akan diganti data nyata)

## Roadmap
1. Frontend dengan data contoh (selesai)
2. API route Gemini + halaman uji agent (selesai)
3. Agent Writer: tulis artikel dari topik/ringkasan
4. Alur persetujuan: item berpindah tahap, disimpan
5. Scout (RSS) + Analyst (ringkasan otomatis)

## Konfigurasi Gemini (Tahap 2)
1. Salin `.env.example` menjadi `.env`, isi `GEMINI_API_KEY`.
2. (Opsional) isi `GEMINI_MODEL`. Jika model gagal/404, sistem otomatis mencoba model cadangan.
3. Restart `npm run dev` setiap kali `.env` diubah.
4. Buka menu **Uji agent**, pilih agent, klik **Isi contoh**, lalu **Jalankan agent**.
