import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin-shell";
import { SALES } from "@/lib/mock-data";
import { Plus, Edit, Trash2, Timer } from "lucide-react";

export const Route = createFileRoute("/admin/sales")({
  head: () => ({ meta: [{ title: "Admin · Sales" }] }),
  component: AdminSales,
});

function Countdown({ to }: { to: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const ms = Math.max(0, new Date(to).getTime() - now);
  const d = Math.floor(ms / 86400000), h = Math.floor(ms / 3600000) % 24, m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
  return (
    <span className="font-mono text-xs tabular-nums">
      {d}d {h.toString().padStart(2,"0")}:{m.toString().padStart(2,"0")}:{s.toString().padStart(2,"0")}
    </span>
  );
}

function AdminSales() {
  return (
    <AdminShell title="Sales & promotions" subtitle="Time-bound discounts by item, category, brand or compatibility">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {["All","Item","Category","Brand","Compatibility"].map((t,i) => (
            <button key={t} className={`px-3 py-2 hairline font-mono text-[11px] uppercase tracking-widest ${i===0?"bg-ink text-bone":""}`}>{t}</button>
          ))}
        </div>
        <button className="h-10 px-4 bg-ink text-bone hover:bg-copper font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> New sale
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SALES.map(s => (
          <div key={s.id} className="hairline bg-card overflow-hidden">
            <div className="bg-copper text-copper-foreground p-4 flex items-center justify-between">
              <div className="font-display text-4xl">{s.percent}%</div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest">
                <Timer className="h-3 w-3" /> <Countdown to={s.endsAt} />
              </div>
            </div>
            <div className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.scope}</div>
              <div className="font-display text-2xl mt-1">{s.name}</div>
              <div className="font-mono text-xs text-muted-foreground mt-1">Targets: {s.scopeRef}</div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-9 hairline hover:bg-secondary font-mono text-[11px] uppercase tracking-widest inline-flex items-center justify-center gap-1.5"><Edit className="h-3.5 w-3.5" /> Edit</button>
                <button className="h-9 px-3 hairline hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-10 hairline bg-card p-6">
        <div className="font-mono text-[11px] tracking-widest uppercase text-copper mb-4">Bulk price update</div>
        <div className="grid md:grid-cols-4 gap-3">
          <select className="hairline bg-background px-3 py-2.5 text-sm">
            <option>By item SKU</option>
            <option>By category</option>
            <option>By brand</option>
            <option>By compatibility</option>
          </select>
          <input placeholder="Reference (e.g. JUKI, Eye Guard)" className="hairline bg-background px-3 py-2.5 text-sm" />
          <input placeholder="New price or % change" className="hairline bg-background px-3 py-2.5 text-sm font-mono" />
          <button className="h-10 bg-ink text-bone hover:bg-copper font-mono text-xs uppercase tracking-widest">Preview & apply</button>
        </div>
      </section>
    </AdminShell>
  );
}
