import { NextResponse } from "next/server";
import { AGENTS } from "@/lib/agents";
import { askGemini } from "@/lib/gemini";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Format permintaan tidak valid." }, { status: 400 }); }
  const agent = AGENTS[`${body.workspace}.${body.agent}`];
  const input = String(body.input || "").trim();
  if (!agent) return NextResponse.json({ error: "Agent tidak dikenal." }, { status: 400 });
  if (!input) return NextResponse.json({ error: "Masukan tidak boleh kosong." }, { status: 400 });
  if (input.length > 4000) return NextResponse.json({ error: "Masukan terlalu panjang (maks 4000 karakter)." }, { status: 400 });

  const r = await askGemini({ system: agent.prompt, input });
  if (!r.ok) return NextResponse.json({ error: r.error, hint: r.hint }, { status: r.status });
  return NextResponse.json({ text: r.text, model: r.model });
}
