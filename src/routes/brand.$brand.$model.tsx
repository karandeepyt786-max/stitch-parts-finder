import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { PartCard } from "@/components/part-card";
import { BRANDS, partsByModel } from "@/lib/mock-data";

export const Route = createFileRoute("/brand/$brand/$model")({
  component: ModelPage,
});

function ModelPage() {
  const { brand, model } = Route.useParams();
  const b = BRANDS.find(x => x.slug === brand);
  const m = b?.models.find(x => x.slug === model);
  if (!b || !m) throw notFound();
  const parts = partsByModel(brand, model);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
          <Link to="/" className="hover:text-copper">Home</Link> /
          <Link to="/brand/$brand" params={{ brand: b.slug }} className="hover:text-copper"> {b.name}</Link> / {m.name}
        </nav>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper">{b.name}</div>
            <h1 className="font-display text-6xl md:text-7xl mt-1">{m.name}</h1>
            <p className="text-muted-foreground mt-2">{m.partsCount} compatible parts</p>
          </div>
          <select className="hairline bg-card px-3 py-2 text-sm">
            <option>Sort: Featured</option>
            <option>Price: low to high</option>
            <option>Best rated</option>
          </select>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {parts.length ? parts.map(p => <PartCard key={p.sku} part={p} />) : (
            <p className="text-muted-foreground col-span-full">No parts listed for this {b.isBrand ? "model" : "category"} yet.</p>
          )}
        </div>
      </div>
    </PageShell>
  );
}
