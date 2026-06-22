import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { PARTS, formatINR } from "@/lib/mock-data";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";

export const Route = createFileRoute("/admin/products")({
  head: () => ({ meta: [{ title: "Admin · Products" }] }),
  component: AdminProducts,
});

function AdminProducts() {
  return (
    <AdminShell title="Products" subtitle={`${PARTS.length} SKUs across all brands and categories`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 hairline bg-card flex items-center">
          <Search className="h-4 w-4 ml-3 text-muted-foreground" />
          <input className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none" placeholder="Search SKU, name, brand, model…" />
        </div>
        <button className="h-10 px-4 hairline bg-card hover:bg-secondary font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2"><Filter className="h-4 w-4" /> Filter</button>
        <Link to="/admin/products/new" className="h-10 px-4 bg-ink text-bone hover:bg-copper font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> New product
        </Link>
      </div>

      <div className="hairline bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground bg-secondary/40">
            <tr>
              <th className="px-4 py-3"><input type="checkbox" className="accent-copper" /></th>
              <th>Product</th><th>SKU</th><th>Brand · Model</th>
              <th>Price</th><th>Stock</th><th>GST</th><th></th>
            </tr>
          </thead>
          <tbody>
            {PARTS.map(p => (
              <tr key={p.sku} className="border-t border-border hover:bg-secondary/30">
                <td className="px-4 py-3"><input type="checkbox" className="accent-copper" /></td>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="h-10 w-10 object-cover hairline" />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{p.id1}</div>
                    </div>
                  </div>
                </td>
                <td className="font-mono text-xs">{p.sku}</td>
                <td className="text-muted-foreground">{p.brandName} · {p.modelName}</td>
                <td className="font-mono">{formatINR(p.price)}</td>
                <td>
                  <span className={`font-mono text-xs ${p.stock < 20 ? "text-destructive" : ""}`}>{p.stock}</span>
                </td>
                <td><span className="font-mono text-xs">{p.hasMotor ? "18%" : "5%"}</span></td>
                <td className="text-right pr-4">
                  <div className="flex justify-end gap-1">
                    <button className="h-8 w-8 grid place-items-center hover:bg-secondary"><Edit className="h-3.5 w-3.5" /></button>
                    <button className="h-8 w-8 grid place-items-center hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
