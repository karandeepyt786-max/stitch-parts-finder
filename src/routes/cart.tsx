import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { MOCK_CART, findPart, formatINR } from "@/lib/mock-data";
import { Minus, Plus, X, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — MachineWorks" }] }),
  component: Cart,
});

function Cart() {
  const items = MOCK_CART.map(c => ({ ...c, part: findPart(c.sku)! })).filter(x => x.part);
  const subtotal = items.reduce((a, i) => a + i.part.price * i.qty, 0);
  const gst = items.reduce((a, i) => a + Math.round(i.part.price * i.qty * (i.part.hasMotor ? 0.18 : 0.05)), 0);
  const shipping = subtotal > 5000 ? 0 : 199;
  const total = subtotal + gst + shipping;

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
          <Link to="/" className="hover:text-copper">Home</Link> / Cart
        </nav>
        <h1 className="font-display text-6xl">Your cart</h1>
        <p className="text-muted-foreground mt-2">{items.length} items · ready to checkout</p>

        <div className="mt-10 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-3">
            {items.map(({ part, qty }) => (
              <div key={part.sku} className="hairline bg-card p-4 flex gap-4 items-center">
                <img src={part.images[0]} alt={part.name} className="h-24 w-24 object-cover hairline" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{part.brandName} · {part.modelName}</div>
                  <Link to="/part/$sku" params={{ sku: part.sku }} className="font-display text-xl truncate block hover:text-copper">{part.name}</Link>
                  <div className="font-mono text-[11px] text-muted-foreground">SKU {part.sku}</div>
                </div>
                <div className="hairline flex items-center bg-background">
                  <button className="h-9 w-9 grid place-items-center hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                  <span className="w-10 text-center font-mono text-sm">{qty}</span>
                  <button className="h-9 w-9 grid place-items-center hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                </div>
                <div className="text-right w-28">
                  <div className="font-display text-xl">{formatINR(part.price * qty)}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{formatINR(part.price)} ea</div>
                </div>
                <button className="h-9 w-9 grid place-items-center hover:bg-destructive hover:text-destructive-foreground" aria-label="Remove">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            <div className="hairline bg-card p-4 flex items-center justify-between">
              <input className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" placeholder="Coupon code · e.g. MONSOON12" />
              <button className="font-mono text-[11px] tracking-[0.15em] uppercase px-4 py-2 bg-ink text-bone hover:bg-copper">Apply</button>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="hairline bg-card p-6 sticky top-28">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-copper mb-4">Order summary</div>
              <dl className="space-y-2 text-sm">
                <Row k="Subtotal" v={formatINR(subtotal)} />
                <Row k="GST (5% / 18%)" v={formatINR(gst)} />
                <Row k={shipping === 0 ? "Shipping (free over ₹5,000)" : "Shipping"} v={shipping === 0 ? "Free" : formatINR(shipping)} />
                <div className="border-t border-border pt-3 mt-3 flex items-end justify-between">
                  <dt className="font-mono text-xs uppercase tracking-widest">Total</dt>
                  <dd className="font-display text-3xl">{formatINR(total)}</dd>
                </div>
              </dl>
              <Link to="/checkout" className="mt-5 w-full h-12 bg-ink text-bone hover:bg-copper transition-colors font-mono text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2">
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-copper" /> Secure checkout · GST invoice issued
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-mono">{v}</dd></div>;
}
