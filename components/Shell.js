"use client";
import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, Columns3, FlaskConical } from "lucide-react";
import { workspaces } from "@/lib/data";

const Ctx = createContext(null);
export const useWorkspace = () => useContext(Ctx);

const nav = [
  { href: "/", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/agents", label: "Agent", icon: Bot },
  { href: "/pipeline", label: "Alur kerja", icon: Columns3 },
  { href: "/playground", label: "Uji agent", icon: FlaskConical },
];

export default function Shell({ children }) {
  const [wsId, setWsId] = useState("media");
  const ws = workspaces[wsId];
  const path = usePathname();
  return (
    <Ctx.Provider value={{ ws, wsId, setWsId }}>
      <div className="min-h-screen md:flex" style={{ "--accent": ws.accent, "--soft": ws.soft }}>
        <aside className="md:w-60 md:min-h-screen bg-ink text-white p-4 md:p-5 flex md:flex-col gap-4 md:gap-8 items-center md:items-stretch flex-wrap">
          <div className="text-xl font-semibold tracking-tight">Orkestra</div>
          <div role="tablist" aria-label="Pilih workspace" className="flex md:flex-col gap-1 bg-white/10 rounded-lg p-1">
            {Object.values(workspaces).map((w) => (
              <button key={w.id} role="tab" aria-selected={w.id === wsId} onClick={() => setWsId(w.id)}
                className={`px-3 py-2 rounded-md text-sm text-left transition-colors ${w.id === wsId ? "bg-white text-ink font-medium" : "text-white/70 hover:text-white"}`}>
                {w.name}
              </button>
            ))}
          </div>
          <nav className="flex md:flex-col gap-1 md:flex-1">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${path === href ? "bg-accent text-white" : "text-white/70 hover:bg-white/10"}`}>
                <Icon size={16} /> {label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block text-xs text-white/50">Tahap 2: agent terhubung ke Gemini</div>
        </aside>
        <main className="flex-1 p-5 md:p-8 min-w-0">{children}</main>
      </div>
    </Ctx.Provider>
  );
}
