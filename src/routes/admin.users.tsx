import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ADMIN_USERS, ADMIN_ADMINS, formatINR } from "@/lib/mock-data";
import { Ban, Mail, Plus, ShieldOff, Shield } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Admin · Users" }] }),
  component: AdminUsers,
});

function AdminUsers() {
  return (
    <AdminShell title="Users & admins" subtitle="Customers, blocked accounts and admin permissions">
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Kpi label="Customers" value="1,284" />
        <Kpi label="Blocked accounts" value="3" tone="warn" />
        <Kpi label="Admin staff" value={String(ADMIN_ADMINS.length)} />
      </div>

      <section className="hairline bg-card mb-8">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="font-mono text-[11px] uppercase tracking-widest">Customers</div>
          <div className="flex gap-2">
            <input placeholder="Search email or phone…" className="hairline bg-background px-3 py-2 text-sm outline-none" />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr><th className="px-6 py-3">Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Spent</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {ADMIN_USERS.map(u => (
              <tr key={u.id} className="border-t border-border hover:bg-secondary/30">
                <td className="px-6 py-3">{u.name}</td>
                <td className="font-mono text-xs">{u.email}</td>
                <td className="font-mono text-xs">{u.phone}</td>
                <td className="font-mono">{u.orders}</td>
                <td className="font-mono">{formatINR(u.spent)}</td>
                <td>
                  <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 ${u.status==="active"?"bg-secondary":"bg-destructive text-destructive-foreground"}`}>{u.status}</span>
                </td>
                <td>
                  <div className="flex gap-1 justify-end pr-4">
                    <button className="h-8 w-8 grid place-items-center hover:bg-secondary" title="Email"><Mail className="h-3.5 w-3.5" /></button>
                    <button className="h-8 w-8 grid place-items-center hover:bg-destructive hover:text-destructive-foreground" title="Block"><Ban className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="hairline bg-card">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="font-mono text-[11px] uppercase tracking-widest">Admin staff</div>
          <button className="h-9 px-3 bg-ink text-bone hover:bg-copper font-mono text-[11px] uppercase tracking-widest inline-flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" /> Invite admin</button>
        </div>
        <table className="w-full text-sm">
          <thead className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr><th className="px-6 py-3">Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {ADMIN_ADMINS.map(a => (
              <tr key={a.id} className="border-t border-border">
                <td className="px-6 py-3">{a.name}</td>
                <td className="font-mono text-xs">{a.email}</td>
                <td>
                  <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 inline-flex items-center gap-1 ${a.role==="superadmin"?"bg-copper text-copper-foreground":"bg-secondary"}`}>
                    {a.role==="superadmin"?<Shield className="h-3 w-3" />:<ShieldOff className="h-3 w-3" />} {a.role}
                  </span>
                </td>
                <td><span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 bg-secondary">{a.status}</span></td>
                <td className="text-right pr-6">
                  <button className="font-mono text-[11px] uppercase tracking-widest hover:text-copper">Permissions</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminShell>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: "warn" }) {
  return (
    <div className="hairline bg-card p-5">
      <div className={`font-display text-4xl ${tone==="warn"?"text-destructive":""}`}>{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
