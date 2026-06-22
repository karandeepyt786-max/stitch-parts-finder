import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { PartCard } from "@/components/part-card";
import { PARTS, BRANDS } from "@/lib/mock-data";
import { SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/catalog")({
  head: () => ({ meta: [{ title: "All Parts — MachineWorks" }, { name: "description", content: "Browse all sewing machine parts across brands and categories." }] }),
  component: Catalog,
});

function Catalog() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-4">
          <Link to="/" className="hover:text-copper">Home</Link> / All parts
        </nav>
        <h1 className="font-display text-6xl">All parts</h1>
        <p className="text-muted-foreground mt-2">{PARTS.length} items · across {BRANDS.length} brands & categories</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 grid grid-cols-12 gap-6">
        {/* Filters */}
        <aside className="col-span-12 md:col-span-3 space-y-6">
          <div className="hairline bg-card p-5">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-copper mb-3 flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
            </div>
            <div className="space-y-5 text-sm">
              <Section title="Brand">
                {BRANDS.filter(b => b.isBrand).map(b => (
                  <label key={b.slug} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-copper" /> {b.name}
                  </label>
                ))}
              </Section>
              <Section title="Category">
                {BRANDS.find(b => b.slug === "others")!.models.map(m => (
                  <label key={m.slug} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-copper" /> {m.name}
                  </label>
                ))}
              </Section>
              <Section title="Stitch type">
                {["Lockstitch", "Overlock", "Chainstitch", "Coverstitch"].map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-copper" /> {s}
                  </label>
                ))}
              </Section>
              <Section title="Price (₹)">
                <div className="flex items-center gap-2">
                  <input className="hairline bg-background w-full px-2 py-1.5 text-sm" placeholder="Min" />
                  <span>—</span>
                  <input className="hairline bg-background w-full px-2 py-1.5 text-sm" placeholder="Max" />
                </div>
              </Section>
              <Section title="Stock">
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-copper" /> In stock only</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-copper" /> On sale</label>
              </Section>
            </div>
          </div>
        </aside>

        {/* Grid with irregular layout */}
        <div className="col-span-12 md:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">Showing 1–{PARTS.length} of {PARTS.length}</div>
            <select className="hairline bg-card px-3 py-2 text-sm">
              <option>Sort: Featured</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
              <option>Newest</option>
              <option>Best rated</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {PARTS.map((p, i) => (
              <PartCard key={p.sku} part={p} span={i === 0 || i === 7 ? 2 : 1} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-1 font-mono text-[11px] tracking-[0.15em] uppercase">
            <button className="h-9 px-3 hairline hover:bg-ink hover:text-bone">Prev</button>
            {[1,2,3,4,5].map(n => (
              <button key={n} className={`h-9 w-9 hairline ${n===1 ? "bg-ink text-bone" : "hover:bg-secondary"}`}>{n}</button>
            ))}
            <button className="h-9 px-3 hairline hover:bg-ink hover:text-bone">Next</button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}
