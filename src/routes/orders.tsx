import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { MOCK_ORDERS, formatINR } from "@/lib/mock-data";
import { Package } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — MachineWorks" }] }),
  component: Orders,
});

const statusStyles: Record<string, string> = {
  placed: "bg-secondary text-foreground",
  shipped: "bg-copper text-copper-foreground",
  delivered: "bg-success text-bone",
  cancelled: "bg-destructive text-destructive-foreground",
};

function Orders() {
  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
          <Link to="/" className="hover:text-copper">Home</Link> / Orders
        </nav>
        <h1 className="font-display text-6xl">Your orders</h1>
        <p className="text-muted-foreground mt-2">{MOCK_ORDERS.length} past orders</p>

        <div className="mt-8 space-y-3">
          {MOCK_ORDERS.map(o => (
            <div key={o.id} className="hairline bg-card p-5 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-12 sm:col-span-4">
                <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">Order</div>
                <div className="font-display text-2xl tracking-wide">{o.id}</div>
                <div className="font-mono text-[11px] text-muted-foreground">Placed {o.placedAt}</div>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">Items</div>
                <div className="flex items-center gap-1.5 mt-1"><Package className="h-3.5 w-3.5" /> {o.items}</div>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">Total</div>
                <div className="font-mono">{formatINR(o.total)}</div>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <span className={`inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-1 ${statusStyles[o.status]}`}>{o.status}</span>
              </div>
              <div className="col-span-6 sm:col-span-2 sm:text-right">
                <button className="font-mono text-[11px] uppercase tracking-widest hover:text-copper">View invoice →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
