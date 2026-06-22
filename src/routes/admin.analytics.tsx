import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ADMIN_WEEKLY, formatINR, PARTS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Admin · Analytics" }] }),
  component: AdminAnalytics,
});

function AdminAnalytics() {
  const max = Math.max(...ADMIN_WEEKLY.map(d => d.revenue));
  const top = [...PARTS].sort((a,b) => b.reviews - a.reviews).slice(0,5);

  return (
    <AdminShell title="Analytics" subtitle="Revenue, inventory and customer trends">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Revenue YTD" value={formatINR(8420000)} sub="+18% vs last yr" />
        <Stat label="Avg order value" value={formatINR(2180)} sub="+4.2%" />
        <Stat label="Repeat rate" value="38%" sub="+2.1pp" />
        <Stat label="Total customers" value="1,284" sub="+147 this mo" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="hairline bg-card p-6">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Revenue · last 7 days</div>
          <div className="flex items-end gap-3 h-56">
            {ADMIN_WEEKLY.map(d => (
              <div key={d.d} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-ink" style={{ height: `${(d.revenue / max) * 100}%` }} />
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{d.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hairline bg-card p-6">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Orders by brand</div>
          <div className="space-y-3">
            {[
              { l: "JUKI", v: 42 },
              { l: "SIRUBA", v: 28 },
              { l: "Brother", v: 16 },
              { l: "Others", v: 14 },
            ].map(b => (
              <div key={b.l}>
                <div className="flex justify-between text-sm"><span>{b.l}</span><span className="font-mono">{b.v}%</span></div>
                <div className="mt-1 h-2 bg-secondary"><div className="h-full bg-copper" style={{ width: `${b.v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hairline bg-card p-6">
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Top selling SKUs</div>
        <table className="w-full text-sm">
          <thead className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr><th className="py-2">Product</th><th>SKU</th><th>Reviews</th><th>Stock</th><th>Revenue</th></tr>
          </thead>
          <tbody>
            {top.map(p => (
              <tr key={p.sku} className="border-t border-border">
                <td className="py-2">{p.name}</td>
                <td className="font-mono text-xs">{p.sku}</td>
                <td className="font-mono">{p.reviews}</td>
                <td className="font-mono">{p.stock}</td>
                <td className="font-mono">{formatINR(p.price * p.reviews * 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="hairline bg-card p-5">
      <div className="font-display text-3xl">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-success mt-1">{sub}</div>
    </div>
  );
}
