"use client";
import { useWorkspace } from "@/components/Shell";
import { days } from "@/lib/data";

const dot = { aktif: "bg-emerald-500", menunggu: "bg-amber-500", idle: "bg-slate-300" };

export default function Home() {
  const { ws } = useWorkspace();
  const count = (id) => ws.items.filter((i) => i.stage === id).length;
  const agentOf = (id) => ws.agents.find((a) => a.id === id);
  const max = Math.max(...ws.weekly);
  const total = ws.weekly.reduce((a, b) => a + b, 0);
  const waiting = count("approval");

  return (
    <div className="space-y-8 max-w-5xl">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{ws.name}</h1>
        <p className="text-slate-600 mt-1">
          {waiting > 0 ? `${waiting} item menunggu persetujuan Anda.` : "Tidak ada item yang menunggu persetujuan."}
        </p>
      </header>

      <section aria-label="Alur agent" className="overflow-x-auto pb-2">
        <div className="flex items-stretch min-w-max">
          {ws.stages.map((s, i) => {
            const a = agentOf(s.id);
            return (
              <div key={s.id} className="flex items-center">
                <div className={`w-36 rounded-lg border p-3 bg-white ${s.human ? "border-accent border-2" : "border-line"}`}>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {a && <span className={`h-2 w-2 rounded-full ${dot[a.status]}`} />}
                    {s.label}
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{count(s.id)}</div>
                  <div className="text-xs text-slate-500">{s.human ? "ditinjau manusia" : a?.name}</div>
                </div>
                {i < ws.stages.length - 1 && <div className="w-6 h-px bg-slate-400" />}
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-lg border border-line p-5">
          <h2 className="font-medium">7 hari terakhir</h2>
          <p className="text-sm text-slate-500">{total} {ws.unit}</p>
          <div className="mt-4 flex items-end gap-3 h-36">
            {ws.weekly.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                <span className="text-xs text-slate-500">{v}</span>
                <div className="w-full rounded-t bg-accent" style={{ height: `${(v / max) * 100}%` }} />
                <span className="text-xs">{days[i]}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg border border-line p-5">
          <h2 className="font-medium">Aktivitas terbaru</h2>
          <ul className="mt-3 divide-y divide-line">
            {ws.activity.map((a, i) => (
              <li key={i} className="py-2.5 flex gap-3 text-sm">
                <span className="text-slate-400 tabular-nums w-11 shrink-0">{a.time}</span>
                <span><b className="font-medium">{a.agent}</b> {a.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
