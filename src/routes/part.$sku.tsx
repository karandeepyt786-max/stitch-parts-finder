import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";
import { PartCard } from "@/components/part-card";
import { findPart, PARTS, formatINR } from "@/lib/mock-data";
import { Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, Star, Minus, Plus, Check } from "lucide-react";

export const Route = createFileRoute("/part/$sku")({
  component: PartPage,
});

function PartPage() {
  const { sku } = Route.useParams();
  const part = findPart(sku);
  if (!part) throw notFound();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"specs" | "compat" | "maint" | "reviews">("specs");
  const onSale = part.compareAt && part.compareAt > part.price;
  const related = PARTS.filter(p => p.brandSlug === part.brandSlug && p.sku !== part.sku).slice(0, 4);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-6">
          <Link to="/" className="hover:text-copper">Home</Link> /
          <Link to="/brand/$brand" params={{ brand: part.brandSlug }} className="hover:text-copper"> {part.brandName}</Link> /
          <Link to="/brand/$brand/$model" params={{ brand: part.brandSlug, model: part.modelSlug }} className="hover:text-copper"> {part.modelName}</Link> / {part.id1}
        </nav>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="aspect-square hairline bg-card overflow-hidden relative">
              <img src={part.images[active]} alt={part.name} className="h-full w-full object-cover" />
              {onSale && <div className="absolute top-4 left-4 bg-copper text-copper-foreground font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1">Sale</div>}
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {part.images.concat(part.images).slice(0, 5).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i % part.images.length)}
                  className={`aspect-square hairline overflow-hidden ${active === i % part.images.length ? "border-ink" : ""}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-copper mb-2">
              {part.brandName} · {part.modelName}
            </div>
            <h1 className="font-display text-5xl leading-none">{part.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(part.rating) ? "fill-copper text-copper" : "text-border"}`} />
                ))}
              </div>
              <span>{part.rating} · {part.reviews} reviews</span>
              <span>·</span>
              <span className="font-mono text-xs">SKU {part.sku}</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="font-display text-5xl">{formatINR(part.price)}</span>
              {onSale && <span className="font-mono text-sm line-through text-muted-foreground mb-2">{formatINR(part.compareAt!)}</span>}
              <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.15em] text-success flex items-center gap-1 mb-2">
                <Check className="h-3.5 w-3.5" /> {part.stock} in stock
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {part.hasMotor ? "Incl. 18% GST" : "Incl. 5% GST"} · Shipping extra at checkout
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="hairline flex items-center bg-card">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 grid place-items-center hover:bg-secondary"><Minus className="h-4 w-4" /></button>
                <span className="w-12 text-center font-mono">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-12 w-12 grid place-items-center hover:bg-secondary"><Plus className="h-4 w-4" /></button>
              </div>
              <button className="flex-1 h-12 bg-ink text-bone hover:bg-copper transition-colors font-mono text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" /> Add to cart · {formatINR(part.price * qty)}
              </button>
              <button className="h-12 w-12 hairline grid place-items-center hover:bg-ink hover:text-bone transition-colors">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 divide-x divide-border hairline bg-card">
              {[
                { Icon: Truck, h: "48h dispatch", s: "From Ludhiana" },
                { Icon: ShieldCheck, h: "OEM-grade", s: "1-yr warranty" },
                { Icon: RotateCcw, h: "30-day returns", s: "Free pickup" },
              ].map(({ Icon, h, s }) => (
                <div key={h} className="p-3 text-center">
                  <Icon className="h-4 w-4 text-copper mx-auto mb-1.5" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em]">{h}</div>
                  <div className="text-[11px] text-muted-foreground">{s}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-muted-foreground leading-relaxed">{part.description}</div>

            <div className="mt-6 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="hairline p-3"><span className="text-muted-foreground uppercase tracking-widest text-[10px]">Part #1</span><div>{part.id1}</div></div>
              {part.id2 && <div className="hairline p-3"><span className="text-muted-foreground uppercase tracking-widest text-[10px]">Part #2</span><div>{part.id2}</div></div>}
              <div className="hairline p-3"><span className="text-muted-foreground uppercase tracking-widest text-[10px]">Diagram</span><div>{part.diagramNumber}</div></div>
              {part.altPartNumbers.length > 0 && (
                <div className="hairline p-3 col-span-2"><span className="text-muted-foreground uppercase tracking-widest text-[10px]">Alt part #s</span><div>{part.altPartNumbers.join(", ")}</div></div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20">
          <div className="flex gap-1 border-b border-border">
            {[
              { id: "specs", l: "Specifications" },
              { id: "compat", l: "Compatibility" },
              { id: "maint", l: "Maintenance" },
              { id: "reviews", l: `Reviews · ${part.reviews}` },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                className={`px-5 py-3 font-mono text-[11px] tracking-[0.2em] uppercase border-b-2 -mb-px transition-colors ${
                  tab === t.id ? "border-copper text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>
          <div className="py-8 max-w-3xl text-sm">
            {tab === "specs" && (
              <dl className="grid grid-cols-2 gap-y-3 gap-x-8">
                {Object.entries(part.specs).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {tab === "compat" && (
              <div className="space-y-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Compatible machines</div>
                  <div className="flex flex-wrap gap-2">
                    {part.compat.machineModels.map(m => (
                      <span key={m} className="hairline px-3 py-1.5 text-xs">{m}</span>
                    ))}
                  </div>
                </div>
                {part.compat.stitchType && (
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Stitch type</div>
                    <div className="flex flex-wrap gap-2">
                      {part.compat.stitchType.map(s => <span key={s} className="hairline px-3 py-1.5 text-xs">{s}</span>)}
                    </div>
                  </div>
                )}
                {part.compat.needleSystem && <p>Needle system: <strong>{part.compat.needleSystem}</strong></p>}
                {part.compat.threadType && <p>Thread: <strong>{part.compat.threadType}</strong></p>}
              </div>
            )}
            {tab === "maint" && (
              <ul className="space-y-3">
                {part.maintenance.lubrication && <li><strong>Lubrication:</strong> {part.maintenance.lubrication}</li>}
                {part.maintenance.replacementInterval_hours && <li><strong>Replacement interval:</strong> every {part.maintenance.replacementInterval_hours.toLocaleString()} hours of operation</li>}
              </ul>
            )}
            {tab === "reviews" && (
              <div className="space-y-4">
                {[
                  { n: "Harpreet S.", r: 5, t: "Exact OEM fit. Smoother than the original after 200h.", at: "2 weeks ago" },
                  { n: "Suresh M.", r: 4, t: "Good quality, packaging could be better.", at: "1 month ago" },
                  { n: "Workshop Anand", r: 5, t: "Bulk order, all units passed QC. Will reorder.", at: "2 months ago" },
                ].map(r => (
                  <div key={r.n} className="hairline p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs">{r.n}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{r.at}</div>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < r.r ? "fill-copper text-copper" : "text-border"}`} />
                      ))}
                    </div>
                    <p className="mt-2 text-sm">{r.t}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        <section className="mt-16">
          <h2 className="font-display text-4xl mb-6">More from {part.brandName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <PartCard key={p.sku} part={p} />)}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
