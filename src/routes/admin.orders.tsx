import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ADMIN_RECENT_ORDERS, formatINR } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Admin · Orders" }] }),
  component: AdminOrders,
});

const STATUSES = ["all","placed","shipped","delivered","cancelled","returned","refunded"];

function AdminOrders() {
  return (
    <AdminShell title="Orders" subtitle="Manage status, refunds and returns">
      <div className="flex gap-1 mb-6 overflow-x-auto">
        {STATUSES.map((s,i) => (
          <button key={s} className={`px-4 py-2 hairline font-mono text-[11px] uppercase tracking-widest ${i===0?"bg-ink text-bone":""}`}>{s}</button>
        ))}
      </div>

      <div className="hairline bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-secondary/40">
            <tr>
              <th className="px-6 py-3">Order</th><th>Customer</th><th>Total</th>
              <th>Status</th><th>Placed</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...ADMIN_RECENT_ORDERS, ...ADMIN_RECENT_ORDERS].map((o,i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30">
                <td className="px-6 py-3 font-mono">{o.id}</td>
                <td>{o.user}</td>
                <td className="font-mono">{formatINR(o.total)}</td>
                <td>
                  <select className="hairline bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-widest" defaultValue={o.status}>
                    <option>placed</option><option>shipped</option><option>delivered</option>
                    <option>cancelled</option><option>returned</option><option>refunded</option>
                  </select>
                </td>
                <td className="text-muted-foreground">{o.at}</td>
                <td>
                  <div className="flex gap-2 font-mono text-[11px] uppercase tracking-widest">
                    <button className="hover:text-copper">View</button>
                    <button className="hover:text-copper">Invoice</button>
                    <button className="hover:text-destructive">Refund</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
