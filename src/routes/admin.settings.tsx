import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Admin · Settings" }] }),
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <AdminShell title="Settings" subtitle="Payment, shipping, GST and email marketing">
      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Payment gateways">
          {["Razorpay","Stripe","UPI","Cash on delivery"].map((g,i) => (
            <Row key={g} label={g} on={i!==1} />
          ))}
        </Card>
        <Card title="Shipping & delivery zones">
          {["Punjab (same-state)","North India","South India","East / NE","International"].map((z,i) => (
            <Row key={z} label={z} on={i<4} />
          ))}
        </Card>
        <Card title="GST configuration">
          <KV k="Non-motor parts" v="5%" />
          <KV k="Motor / electrical" v="18%" />
          <KV k="Shipping GST (interstate)" v="5%" />
          <KV k="Default GSTIN" v="03AAACX0000X1Z2" />
        </Card>
        <Card title="Homepage banners">
          <KV k="Hero headline" v="Every part. Every stitch." />
          <KV k="Sale ticker" v="Live · 3 sales running" />
          <button className="mt-2 font-mono text-[11px] uppercase tracking-widest text-copper hover:underline">Edit banners →</button>
        </Card>
        <Card title="Email marketing">
          <p className="text-sm text-muted-foreground">Send segmented campaigns to customers (sale alerts, low stock, abandoned cart).</p>
          <button className="mt-3 h-10 px-4 bg-ink text-bone hover:bg-copper font-mono text-xs uppercase tracking-widest">New campaign</button>
        </Card>
        <Card title="Admin permissions">
          {["Manage products","Manage orders","Manage users","Block admins","Edit pricing","View reports"].map((p,i) => (
            <Row key={p} label={p} on={i<5} />
          ))}
        </Card>
      </div>
    </AdminShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="hairline bg-card p-6">
      <div className="font-display text-2xl mb-4">{title}</div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
function Row({ label, on }: { label: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm">{label}</span>
      <button className={`relative w-10 h-5 rounded-full transition-colors ${on ? "bg-ink" : "bg-border"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-bone transition-all ${on ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}
function KV({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between py-1.5 text-sm border-b border-border last:border-0">
    <span className="text-muted-foreground">{k}</span>
    <span className="font-mono text-xs">{v}</span>
  </div>;
}
