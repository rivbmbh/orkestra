"use client";
import { useEffect, useState } from "react";
import { Play, Copy, Wand2 } from "lucide-react";
import { useWorkspace } from "@/components/Shell";
import { AGENT_UI } from "@/lib/agent-ui";

export default function Playground() {
  const { ws, wsId } = useWorkspace();
  const [agentId, setAgentId] = useState(ws.agents[0].id);
  const [input, setInput] = useState("");
  const [state, setState] = useState({ loading: false, text: "", model: "", error: "", hint: "" });
  const [copied, setCopied] = useState(false);

  useEffect(() => { setAgentId(ws.agents[0].id); setInput(""); setState({ loading: false, text: "", model: "", error: "", hint: "" }); }, [wsId]);

  const agent = ws.agents.find((a) => a.id === agentId) || ws.agents[0];
  const example = AGENT_UI[`${wsId}.${agent.id}`]?.example || "";

  async function run() {
    setState({ loading: true, text: "", model: "", error: "", hint: "" });
    try {
      const res = await fetch("/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ workspace: wsId, agent: agent.id, input }) });
      const data = await res.json();
      if (!res.ok) setState({ loading: false, text: "", model: "", error: data.error || "Terjadi kesalahan.", hint: data.hint || "" });
      else setState({ loading: false, text: data.text, model: data.model, error: "", hint: "" });
    } catch {
      setState({ loading: false, text: "", model: "", error: "Server tidak merespons.", hint: "Pastikan npm run dev masih berjalan." });
    }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(state.text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }

  return (
    <div className="max-w-4xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Uji agent</h1>
        <p className="text-slate-600 mt-1">Jalankan satu agent {ws.name} dengan Gemini dan lihat hasilnya langsung.</p>
      </header>

      <div className="bg-white border border-line rounded-lg p-5 space-y-4">
        <div>
          <label htmlFor="agent" className="text-sm font-medium">Agent</label>
          <select id="agent" value={agent.id} onChange={(e) => { setAgentId(e.target.value); setInput(""); }}
            className="mt-1 block w-full rounded-md border border-line px-3 py-2 text-sm bg-white">
            {ws.agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <p className="text-sm text-slate-500 mt-1">{agent.desc}</p>
        </div>
        <div>
          <div className="flex justify-between items-end">
            <label htmlFor="input" className="text-sm font-medium">Masukan</label>
            <button type="button" onClick={() => setInput(example)} className="text-sm text-accent flex items-center gap-1 hover:underline"><Wand2 size={14} /> Isi contoh</button>
          </div>
          <textarea id="input" rows={6} maxLength={4000} value={input} onChange={(e) => setInput(e.target.value)}
            className="mt-1 block w-full rounded-md border border-line px-3 py-2 text-sm" placeholder="Tulis masukan untuk agent..." />
          <div className="text-xs text-slate-400 text-right">{input.length}/4000</div>
        </div>
        <button type="button" onClick={run} disabled={state.loading || !input.trim()}
          className="inline-flex items-center gap-2 bg-accent text-white rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50">
          <Play size={14} /> {state.loading ? "Agent sedang bekerja..." : "Jalankan agent"}
        </button>
      </div>

      {state.error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <b className="font-medium">{state.error}</b>{state.hint && <div className="mt-1">{state.hint}</div>}
        </div>
      )}
      {state.text && (
        <section className="bg-white border border-line rounded-lg p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium">Hasil {agent.name}</h2>
            <button type="button" onClick={copy} className="text-sm flex items-center gap-1 text-slate-600 hover:text-ink"><Copy size={14} /> {copied ? "Tersalin" : "Salin"}</button>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{state.text}</div>
          <div className="text-xs text-slate-400 mt-4">Model: {state.model}</div>
        </section>
      )}
    </div>
  );
}
