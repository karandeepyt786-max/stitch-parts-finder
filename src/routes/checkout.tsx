import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { MOCK_CART, findPart, formatINR } from "@/lib/mock-data";
import { Lock, Truck, CreditCard } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — MachineWorks" }] }),
  component: Checkout,
});

function Checkout() {
  const items = MOCK_CART.map(c => ({ ...c, part: findPart(c.sku)! })).filter(x => x.part);
  const subtotal = items.reduce((a, i) => a + i.part.price * i.qty, 0);
  const gst = items.reduce((a, i) => a + Math.round(i.part.price * i.qty * (i.part.hasMotor ? 0.18 : 0.05)), 0);
  const interstateExtra = Math.round(gst * 0.5);
  const shipping = 199;
  const shippingGst = Math.round(shipping * 0.05);
  const total = subtotal + gst + interstateExtra + shipping + shippingGst;

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
          <Link to="/cart" className="hover:text-copper">Cart</Link> / Checkout
        </nav>
        <h1 className="font-display text-6xl">Checkout</h1>

        <div className="mt-10 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <Step n="01" title="Shipping address" Icon={Truck}>
              <div className="grid md:grid-cols-2 gap-3">
                <Input label="Full name" placeholder="Amit Sharma" />
                <Input label="Phone" placeholder="+91 98xxxxxxxx" />
                <Input label="Email" placeholder="you@workshop.in" className="md:col-span-2" />
                <Input label="Street address" placeholder="Model Town" className="md:col-span-2" />
                <Input label="City" placeholder="Ludhiana" />
                <Input label="State" placeholder="Punjab" />
                <Input label="Postal code" placeholder="141002" />
                <Input label="GSTIN (optional)" placeholder="03AAACX0000X1Z2" />
              </div>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-copper" defaultChecked /> Save this address for future orders
              </label>
            </Step>

            <Step n="02" title="Delivery" Icon={Truck}>
              <div className="grid sm:grid-cols-2 gap-3">
                <Radio name="ship" defaultChecked label="Standard · 48–72h" sub="₹199 · Free above ₹5,000" />
                <Radio name="ship" label="Express · 24h" sub="₹499" />
              </div>
            </Step>

            <Step n="03" title="Payment" Icon={CreditCard}>
              <div className="space-y-2">
                <Radio name="pay" defaultChecked label="UPI" sub="Pay via any UPI app" />
                <Radio name="pay" label="Credit / debit card" sub="Visa, Master, Rupay" />
                <Radio name="pay" label="Net banking" sub="All major banks" />
                <Radio name="pay" label="Cash on delivery" sub="Available for orders under ₹10,000" />
              </div>
            </Step>
          </div>

          <aside className="lg:col-span-4">
            <div className="hairline bg-card p-6 sticky top-28">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-copper mb-4">Your order</div>
              <ul className="space-y-3 max-h-72 overflow-auto pr-1">
                {items.map(({ part, qty }) => (
                  <li key={part.sku} className="flex gap-3 text-sm">
                    <img src={part.images[0]} className="h-12 w-12 object-cover hairline shrink-0" alt={part.name} />
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{part.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">× {qty}</div>
                    </div>
                    <div className="font-mono text-xs">{formatINR(part.price * qty)}</div>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 pt-4 border-t border-border space-y-1.5 text-sm">
                <Row k="Subtotal" v={formatINR(subtotal)} />
                <Row k="GST (item-wise)" v={formatINR(gst)} />
                <Row k="CGST + SGST (interstate)" v={formatINR(interstateExtra)} />
                <Row k="Shipping" v={formatINR(shipping)} />
                <Row k="GST on shipping (5%)" v={formatINR(shippingGst)} />
                <div className="border-t border-border mt-3 pt-3 flex items-end justify-between">
                  <dt className="font-mono text-xs uppercase tracking-widest">Total</dt>
                  <dd className="font-display text-3xl">{formatINR(total)}</dd>
                </div>
              </dl>
              <button className="mt-5 w-full h-12 bg-ink text-bone hover:bg-copper font-mono text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" /> Place order
              </button>
              <p className="mt-3 text-[11px] text-muted-foreground text-center">
                By placing this order you agree to our terms & refund policy.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

function Step({ n, title, Icon, children }: { n: string; title: string; Icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <section className="hairline bg-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-display text-3xl text-copper">{n}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-display text-2xl tracking-wide">{title}</h2>
      </div>
      {children}
    </section>
  );
}
function Input({ label, placeholder, className = "" }: { label: string; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{label}</span>
      <input placeholder={placeholder} className="mt-1 w-full hairline bg-background px-3 py-2.5 text-sm outline-none focus:border-copper" />
    </label>
  );
}
function Radio({ name, label, sub, defaultChecked }: { name: string; label: string; sub: string; defaultChecked?: boolean }) {
  return (
    <label className="hairline p-3 flex items-center gap-3 cursor-pointer hover:border-ink">
      <input type="radio" name={name} defaultChecked={defaultChecked} className="accent-copper" />
      <div>
        <div className="text-sm">{label}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </label>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-mono">{v}</dd></div>;
}
