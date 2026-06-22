import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { MOCK_WISHLIST, findPart, formatINR } from "@/lib/mock-data";
import { ShoppingCart, X, Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — MachineWorks" }] }),
  component: Wishlist,
});

function Wishlist() {
  const items = MOCK_WISHLIST.map(sku => findPart(sku)!).filter(Boolean);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
          <Link to="/" className="hover:text-copper">Home</Link> / Wishlist
        </nav>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-display text-6xl">Wishlist</h1>
            <p className="text-muted-foreground mt-2">{items.length} saved parts</p>
          </div>
          <Heart className="h-10 w-10 text-copper" />
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-3">
          {items.map(p => (
            <div key={p.sku} className="hairline bg-card flex">
              <Link to="/part/$sku" params={{ sku: p.sku }}>
                <img src={p.images[0]} alt={p.name} className="h-32 w-32 object-cover" />
              </Link>
              <div className="flex-1 p-4 flex flex-col">
                <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{p.brandName} · {p.modelName}</div>
                <Link to="/part/$sku" params={{ sku: p.sku }} className="font-display text-xl hover:text-copper">{p.name}</Link>
                <div className="font-mono text-[11px] text-muted-foreground mt-1">SKU {p.sku}</div>
                <div className="mt-auto flex items-end justify-between">
                  <div className="font-display text-2xl">{formatINR(p.price)}</div>
                  <div className="flex gap-2">
                    <button className="h-9 px-3 bg-ink text-bone font-mono text-[11px] uppercase tracking-[0.15em] inline-flex items-center gap-1.5"><ShoppingCart className="h-3.5 w-3.5" /> Add</button>
                    <button className="h-9 w-9 grid place-items-center hairline hover:bg-destructive hover:text-destructive-foreground"><X className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
