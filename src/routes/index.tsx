import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Wrench, Clock } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { PartCard } from "@/components/part-card";
import { BRANDS, PARTS, SALES, formatINR } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MachineWorks — Industrial Sewing Parts" },
      { name: "description", content: "Genuine sewing machine parts for JUKI, SIRUBA, Brother & more. Shipped pan-India." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PARTS.slice(0, 5);
  const popularModels = BRANDS.filter(b => b.isBrand).slice(0, 4);

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative blueprint-grid border-b border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper mb-6">
              Ludhiana · Since 1994 · Trade-grade
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85]">
              Every part.<br />
              Every <span className="text-copper">stitch</span>.<br />
              Shipped fast.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              12,000+ SKUs across JUKI, SIRUBA, Brother, Jack & Pegasus. Eye guards to servo motors —
              dispatched from Punjab in 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalog" className="h-12 px-6 inline-flex items-center gap-2 bg-ink text-bone hover:bg-copper transition-colors font-mono text-xs uppercase tracking-[0.2em]">
                Shop the catalog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/brand/$brand" params={{ brand: "others" }} className="h-12 px-6 inline-flex items-center gap-2 border border-ink hover:bg-ink hover:text-bone transition-colors font-mono text-xs uppercase tracking-[0.2em]">
                Browse by category
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-square hairline bg-card overflow-hidden">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=70"
                alt="Sewing machine hook assembly" className="h-full w-full object-cover" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase bg-bone px-2 py-1">Featured · SKU HX-48300</span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase bg-ink text-bone px-2 py-1">In stock × 42</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-bone/95 p-4 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Rotary Hook Assembly</div>
                  <div className="font-display text-3xl">{formatINR(2450)}</div>
                </div>
                <Link to="/part/$sku" params={{ sku: "SKU-JUKI-HX48300" }} className="h-10 px-4 bg-ink text-bone font-mono text-[11px] uppercase tracking-[0.15em] inline-flex items-center gap-1.5">
                  View <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* trust strip */}
        <div className="border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { Icon: Truck, h: "48-hr dispatch", s: "Pan-India" },
              { Icon: ShieldCheck, h: "OEM-grade", s: "Verified parts" },
              { Icon: Wrench, h: "Tech support", s: "Mon–Sat · 9–7" },
              { Icon: Clock, h: "30-day returns", s: "No questions" },
            ].map(({ Icon, h, s }) => (
              <div key={h} className="px-4 py-5 flex items-center gap-3">
                <Icon className="h-5 w-5 text-copper shrink-0" />
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-[0.15em]">{h}</div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALE TICKER */}
      <section className="bg-ink text-bone overflow-hidden border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6 overflow-x-auto">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-copper shrink-0">Live now</span>
          {SALES.map(s => (
            <div key={s.id} className="flex items-center gap-2 whitespace-nowrap text-xs">
              <span className="font-mono uppercase tracking-widest">{s.percent}% off</span>
              <span className="text-bone/70">{s.name}</span>
              <span className="font-mono text-[10px] text-copper">· ends {new Date(s.endsAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY BRAND */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper">01 · Catalog</div>
            <h2 className="font-display text-5xl mt-2">Shop by brand</h2>
          </div>
          <Link to="/catalog" className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] hover:text-copper">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {popularModels.map((b, i) => (
            <Link
              key={b.slug}
              to="/brand/$brand"
              params={{ brand: b.slug }}
              className={`group relative aspect-square hairline bg-card overflow-hidden flex items-end p-5 hover:bg-ink hover:text-bone transition-colors ${
                i === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""
              }`}
            >
              <div className="relative z-10">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-copper">
                  {b.models.length} models · {b.models.reduce((a, m) => a + m.partsCount, 0)} parts
                </div>
                <div className={`font-display tracking-wide mt-1 ${i === 0 ? "text-7xl" : "text-3xl"}`}>{b.name}</div>
              </div>
            </Link>
          ))}
          <Link
            to="/brand/$brand"
            params={{ brand: "others" }}
            className="group relative aspect-square hairline bg-copper text-copper-foreground overflow-hidden flex items-end p-5 hover:bg-ink transition-colors"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-80">Universal parts</div>
              <div className="font-display text-3xl mt-1">Categories</div>
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURED PARTS */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper">02 · This week</div>
              <h2 className="font-display text-5xl mt-2">Workshop favourites</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.slice(0, 4).map(p => <PartCard key={p.sku} part={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-6">
        <div className="bg-ink text-bone p-10 ticker-stripe-none">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper mb-4">For workshops</div>
          <h3 className="font-display text-4xl">Bulk order pricing</h3>
          <p className="mt-3 text-sm text-bone/70 max-w-sm">Tiered discounts on 50+ unit orders. Dedicated account manager. GST invoices, NET-15 terms.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-copper hover:text-bone">
            Talk to sales <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="bg-copper text-copper-foreground p-10">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase opacity-80 mb-4">Need help?</div>
          <h3 className="font-display text-4xl">Live tech support</h3>
          <p className="mt-3 text-sm opacity-90 max-w-sm">Stuck on a part number? Chat live with our parts team — average reply under 2 minutes.</p>
          <Link to="/support" className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] hover:opacity-80">
            Start a chat <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
