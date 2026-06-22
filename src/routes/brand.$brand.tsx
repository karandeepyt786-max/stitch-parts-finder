import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { PartCard } from "@/components/part-card";
import { BRANDS, partsByBrand } from "@/lib/mock-data";

export const Route = createFileRoute("/brand/$brand")({
  component: BrandPage,
});

function BrandPage() {
  const { brand } = Route.useParams();
  const b = BRANDS.find(x => x.slug === brand);
  if (!b) throw notFound();
  const parts = partsByBrand(brand);

  return (
    <PageShell>
      <div className="bg-ink text-bone">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-bone/60 mb-3">
            <Link to="/" className="hover:text-copper">Home</Link> /
            <Link to="/catalog" className="hover:text-copper"> Catalog</Link> / {b.name}
          </nav>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper mb-2">
                {b.isBrand ? "Brand" : "Categories"}
              </div>
              <h1 className="font-display text-7xl md:text-8xl">{b.name}</h1>
            </div>
            <div className="font-mono text-xs text-bone/70">
              {b.models.length} {b.isBrand ? "models" : "categories"} · {b.models.reduce((a, m) => a + m.partsCount, 0)} parts
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-copper mb-4">
          {b.isBrand ? "Select model" : "Select category"}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
          {b.models.map(m => (
            <Link
              key={m.slug}
              to="/brand/$brand/$model"
              params={{ brand: b.slug, model: m.slug }}
              className="hairline bg-card hover:bg-ink hover:text-bone transition-colors p-4 flex flex-col gap-1"
            >
              <div className="font-display text-2xl tracking-wide">{m.name}</div>
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{m.partsCount} parts</div>
            </Link>
          ))}
        </div>

        <h2 className="font-display text-3xl mb-4">All {b.name} parts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {parts.length ? parts.map(p => <PartCard key={p.sku} part={p} />) :
            <p className="text-muted-foreground col-span-full">No parts listed yet.</p>}
        </div>
      </div>
    </PageShell>
  );
}
