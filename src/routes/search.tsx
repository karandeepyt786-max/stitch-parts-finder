import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { PartCard } from "@/components/part-card";
import { PARTS } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const query = q.toLowerCase();
  const results = query
    ? PARTS.filter(p =>
        [p.name, p.sku, p.id1, p.id2, p.diagramNumber, p.brandName, p.modelName,
         ...p.altPartNumbers, ...p.compat.machineModels].join(" ").toLowerCase().includes(query))
    : PARTS;

  return (
    <PageShell>
      <div className="bg-secondary/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <form className="flex items-center hairline bg-card max-w-3xl">
            <Search className="h-5 w-5 ml-4 text-muted-foreground" />
            <input
              name="q" defaultValue={q}
              className="flex-1 bg-transparent px-4 py-4 text-lg outline-none"
              placeholder="Part #, model, brand, diagram # or compatibility…"
            />
            <button className="h-full px-6 py-4 bg-ink text-bone font-mono text-[11px] tracking-[0.2em] uppercase">Search</button>
          </form>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{results.length} results{q && <> for <strong className="text-foreground">"{q}"</strong></>}</span>
            <span>·</span>
            <span className="font-mono text-xs">Searching: name, SKU, part #, model, brand, diagram #, alt part #, compatibility</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {results.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map(p => <PartCard key={p.sku} part={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="font-display text-4xl">No matches</div>
            <p className="text-muted-foreground mt-2">Try a different SKU or brand name.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
