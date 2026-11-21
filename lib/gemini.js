// Pemanggil Gemini lewat REST (tanpa SDK). Hanya dipakai di server.
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export async function askGemini({ system, input }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return { ok: false, status: 500, error: "GEMINI_API_KEY belum diisi.", hint: "Isi GEMINI_API_KEY di file .env, lalu restart npm run dev." };
  }
  // Model utama dari .env, dengan cadangan jika tidak tersedia atau kuota habis.
  const models = [...new Set([process.env.GEMINI_MODEL, "gemini-3.1-flash-lite", "gemini-2.5-flash"].filter(Boolean))];
  let last = null;
  for (const model of models) {
    try {
      const res = await fetch(`${BASE}/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: input }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 2048 },
        }),
        signal: AbortSignal.timeout(45000),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const text = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
        if (text) return { ok: true, text, model };
        last = { ok: false, status: 502, error: "Model tidak mengembalikan teks.", hint: "Coba ubah masukan. Bisa jadi terblokir filter keamanan." };
        continue;
      }
      const msg = data.error?.message || `Gemini mengembalikan status ${res.status}`;
      if ([400, 401, 403].includes(res.status) && /api key|permission|credential/i.test(msg)) {
        return { ok: false, status: 401, error: "API key ditolak.", hint: "Periksa GEMINI_API_KEY di .env (tanpa tanda kutip atau spasi)." };
      }
      last = { ok: false, status: res.status === 429 ? 429 : 502, error: msg, hint: res.status === 429 ? "Kuota gratis sedang habis. Tunggu sebentar lalu coba lagi." : `Model ${model} gagal. Coba ganti GEMINI_MODEL di .env.` };
      if (![404, 429, 503, 500].includes(res.status)) return last;
    } catch (e) {
      last = { ok: false, status: 504, error: "Tidak bisa menghubungi Gemini.", hint: "Periksa koneksi internet Anda." };
    }
  }
  return last;
}
