"use client";
import { useWorkspace } from "@/components/Shell";

export default function Pipeline() {
  const { ws } = useWorkspace();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Alur kerja</h1>
        <p className="text-slate-600 mt-1">Posisi setiap item di {ws.name}.</p>
      </header>
      <div className="overflow-x-auto pb-3">
        <div className="flex gap-4 min-w-max">
          {ws.stages.map((s) => {
            const items = ws.items.filter((i) => i.stage === s.id);
            return (
              <section key={s.id} className={`w-64 rounded-lg p-3 ${s.human ? "bg-soft" : "bg-slate-200/60"}`}>
                <h2 className="text-sm font-medium flex justify-between mb-3">{s.label}<span className="text-slate-500">{items.length}</span></h2>
                <ul className="space-y-2">
                  {items.map((i) => (
                    <li key={i.id} className="bg-white border border-line rounded-md p-3">
                      <div className="text-sm font-medium">{i.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{i.meta}</div>
                    </li>
                  ))}
                  {items.length === 0 && <li className="text-xs text-slate-500 p-2">Belum ada item.</li>}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
