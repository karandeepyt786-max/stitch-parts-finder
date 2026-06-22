import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ADMIN_KPIS, ADMIN_WEEKLY, ADMIN_RECENT_ORDERS, ISSUES, formatINR } from "@/lib/mock-data";
import { TrendingUp, ShoppingBag, Users, AlertTriangle, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin · Dashboard — MachineWorks" }] }),
  component: AdminDash,
});

function AdminDash() {
  const max = Math.max(...ADMIN_WEEKLY.map(d => d.revenue));
  return (
    <AdminShell title="Dashboard" subtitle="Live overview of orders, revenue, stock and support">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Kpi Icon={TrendingUp} label="Revenue · 7 days" value={formatINR(ADMIN_KPIS.revenueWeek)} delta="+12.4%" />
        <Kpi Icon={ShoppingBag} label="Orders · 7 days" value={String(ADMIN_KPIS.ordersWeek)} delta="+8.1%" />
        <Kpi Icon={Users} label="Active users" value={ADMIN_KPIS.activeUsers.toLocaleString()} delta="+3.2%" />
        <Kpi Icon={AlertTriangle} label="Low stock alerts" value={String(ADMIN_KPIS.lowStock)} delta="needs review" tone="warn" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 hairline bg-card p-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">Revenue · this week</div>
              <div className="font-display text-4xl">{formatINR(ADMIN_KPIS.revenueWeek)}</div>
            </div>
            <div className="flex gap-1 text-[10px] font-mono uppercase tracking-widest">
              {["Week","Month","Year"].map((t,i) => (
                <button key={t} className={`px-3 py-1.5 hairline ${i===0?"bg-ink text-bone":""}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-3 h-64">
            {ADMIN_WEEKLY.map(d => (
              <div key={d.d} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-secondary relative" style={{ height: `${(d.revenue / max) * 100}%` }}>
                  <div className="absolute inset-x-0 bottom-0 bg-copper" style={{ height: `${(d.orders / 25) * 100}%` }} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{d.d}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-[11px] font-mono tracking-widest uppercase">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-secondary inline-block" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-copper inline-block" /> Orders</span>
          </div>
        </div>

        {/* Open issues */}
        <div className="hairline bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">Open support tickets</div>
            <span className="font-display text-2xl">{ISSUES.filter(i=>i.status==="open").length}</span>
          </div>
          <div className="space-y-3">
            {ISSUES.map(i => (
              <div key={i.id} className="flex items-start gap-3 text-sm">
                <span className={`h-2 w-2 rounded-full mt-1.5 ${i.status==="open"?"bg-copper":"bg-success"}`} />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{i.user}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{i.subject.replace("_"," ")} · {i.at}</div>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 hairline bg-card">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="font-mono text-[11px] tracking-widest uppercase">Recent orders</div>
          <a className="font-mono text-[11px] uppercase tracking-widest text-copper hover:underline" href="/admin/orders">View all →</a>
        </div>
        <table className="w-full text-sm">
          <thead className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr><th className="px-6 py-3">Order</th><th>Customer</th><th>Total</th><th>Status</th><th>When</th></tr>
          </thead>
          <tbody>
            {ADMIN_RECENT_ORDERS.map(o => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-6 py-3 font-mono">{o.id}</td>
                <td>{o.user}</td>
                <td className="font-mono">{formatINR(o.total)}</td>
                <td><StatusPill s={o.status} /></td>
                <td className="text-muted-foreground">{o.at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function Kpi({ Icon, label, value, delta, tone }: { Icon: any; label: string; value: string; delta: string; tone?: "warn" }) {
  return (
    <div className="hairline bg-card p-5">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-copper" />
        <span className={`font-mono text-[10px] uppercase tracking-widest ${tone==="warn"?"text-destructive":"text-success"}`}>{delta}</span>
      </div>
      <div className="font-display text-3xl mt-3">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function StatusPill({ s }: { s: string }) {
  const styles: Record<string,string> = {
    placed: "bg-secondary",
    shipped: "bg-copper text-copper-foreground",
    delivered: "bg-success text-bone",
    cancelled: "bg-destructive text-destructive-foreground",
  };
  return <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-1 ${styles[s]}`}>{s}</span>;
}
