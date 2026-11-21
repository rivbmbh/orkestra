"use client";
import { useWorkspace } from "@/components/Shell";

const badge = {
  aktif: "bg-emerald-100 text-emerald-800",
  menunggu: "bg-amber-100 text-amber-800",
  idle: "bg-slate-200 text-slate-700",
};

export default function Agents() {
  const { ws } = useWorkspace();
  return (
    <div className="max-w-4xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Agent {ws.name}</h1>
        <p className="text-slate-600 mt-1">{ws.agents.length} agent bekerja berurutan, dengan persetujuan manusia sebelum konten tayang.</p>
      </header>
      <ul className="space-y-3">
        {ws.agents.map((a) => (
          <li key={a.id} className="bg-white border border-line rounded-lg p-4 flex flex-wrap gap-x-6 gap-y-2 items-start">
            <div className="flex-1 min-w-[220px]">
              <div className="font-medium">{a.name}</div>
              <p className="text-sm text-slate-600 mt-1">{a.desc}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block text-xs px-2 py-1 rounded-full ${badge[a.status]}`}>{a.status}</span>
              <div className="text-sm mt-2"><b>{a.done}</b> tugas selesai</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
