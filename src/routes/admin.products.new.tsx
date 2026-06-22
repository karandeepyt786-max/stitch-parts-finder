import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/admin-shell";
import { BRANDS } from "@/lib/mock-data";
import { Upload, Save } from "lucide-react";

export const Route = createFileRoute("/admin/products/new")({
  head: () => ({ meta: [{ title: "Admin · New product" }] }),
  component: NewProduct,
});

function NewProduct() {
  const [mode, setMode] = useState<"brand" | "category">("brand");
  return (
    <AdminShell title="New product" subtitle="Add a part to the catalog">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="hairline bg-card p-6">
            <div className="font-mono text-[11px] tracking-widest uppercase text-copper mb-4">Step 01 · Classify</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <button onClick={() => setMode("brand")}
                className={`hairline p-4 text-left ${mode==="brand"?"bg-ink text-bone":"hover:bg-secondary"}`}>
                <div className="font-display text-2xl">Brand</div>
                <div className="font-mono text-[10px] uppercase tracking-widest opacity-70 mt-1">e.g. JUKI · DDL-8700</div>
              </button>
              <button onClick={() => setMode("category")}
                className={`hairline p-4 text-left ${mode==="category"?"bg-ink text-bone":"hover:bg-secondary"}`}>
                <div className="font-display text-2xl">Universal / Others</div>
                <div className="font-mono text-[10px] uppercase tracking-widest opacity-70 mt-1">e.g. Eye Guard · Motor</div>
              </button>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <Sel label={mode === "brand" ? "Brand" : "Category root"} options={
                mode === "brand"
                  ? BRANDS.filter(b => b.isBrand).map(b => b.name).concat("+ Create new brand…")
                  : ["Others"]
              } />
              <Sel label={mode === "brand" ? "Model" : "Category"} options={
                mode === "brand"
                  ? ["DDL-8700","MO-6716S","988/700K","S-7200C","+ Create new model…"]
                  : ["Eye Guard","Puller","Folder","Needle Plate","Presser Foot","Motor","+ Create new category…"]
              } />
            </div>
          </section>

          <section className="hairline bg-card p-6 space-y-4">
            <div className="font-mono text-[11px] tracking-widest uppercase text-copper mb-2">Step 02 · Details</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Inp label="Product name" placeholder="Rotary Hook Assembly" />
              <Inp label="SKU" placeholder="SKU-JUKI-HX48300" mono />
              <Inp label="Part # (id1)" placeholder="HX-48300" mono />
              <Inp label="Part # (id2)" placeholder="KD14" mono />
              <Inp label="Diagram #" placeholder="D-112" mono />
              <Inp label="Alt part #s (comma-sep)" placeholder="B1830-372-OAO, 229-26309" mono />
            </div>
            <Inp label="Description" placeholder="Hardened steel rotary hook…" textarea />
          </section>

          <section className="hairline bg-card p-6 space-y-4">
            <div className="font-mono text-[11px] tracking-widest uppercase text-copper mb-2">Step 03 · Compatibility & specs</div>
            <Inp label="Compatible machines (comma-sep)" placeholder="JUKI DDL-8700, JUKI DDL-9000" />
            <div className="grid sm:grid-cols-3 gap-3">
              <Inp label="Needle system" placeholder="DBx1" />
              <Inp label="Thread type" placeholder="Polyester or Cotton" />
              <Sel label="Stitch type" options={["Lockstitch","Overlock","Chainstitch","Coverstitch"]} />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <Inp label="Material" placeholder="Hardened steel" />
              <Inp label="Weight" placeholder="65g" />
              <Inp label="Replacement (hrs)" placeholder="5000" />
            </div>
          </section>

          <section className="hairline bg-card p-6 space-y-4">
            <div className="font-mono text-[11px] tracking-widest uppercase text-copper mb-2">Step 04 · Images</div>
            <label className="hairline border-dashed bg-secondary/30 p-10 flex flex-col items-center gap-2 cursor-pointer hover:border-ink block">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="font-mono text-[11px] uppercase tracking-widest">Drop images · or click to upload</div>
              <div className="text-[11px] text-muted-foreground">PNG, JPG up to 5MB · multiple allowed</div>
              <input type="file" hidden multiple />
            </label>
          </section>
        </div>

        <aside className="lg:col-span-1 space-y-4">
          <section className="hairline bg-card p-6">
            <div className="font-mono text-[11px] tracking-widest uppercase text-copper mb-4">Pricing & stock</div>
            <div className="space-y-3">
              <Inp label="Price (₹)" placeholder="2450" />
              <Inp label="Compare-at price (₹)" placeholder="2800" />
              <Inp label="Stock" placeholder="42" />
              <Inp label="Needed stock alert" placeholder="20" />
              <label className="flex items-center gap-2 text-sm pt-2">
                <input type="checkbox" className="accent-copper" /> Contains motor (18% GST)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-copper" defaultChecked /> Active in store
              </label>
            </div>
          </section>
          <button className="w-full h-12 bg-ink text-bone hover:bg-copper font-mono text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2">
            <Save className="h-4 w-4" /> Save product
          </button>
        </aside>
      </div>
    </AdminShell>
  );
}

function Inp({ label, placeholder, mono, textarea }: { label: string; placeholder?: string; mono?: boolean; textarea?: boolean }) {
  const cls = `mt-1 w-full hairline bg-background px-3 py-2.5 text-sm outline-none focus:border-copper ${mono ? "font-mono" : ""}`;
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{label}</span>
      {textarea ? <textarea rows={3} className={cls + " resize-none"} placeholder={placeholder} /> : <input className={cls} placeholder={placeholder} />}
    </label>
  );
}
function Sel({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{label}</span>
      <select className="mt-1 w-full hairline bg-background px-3 py-2.5 text-sm outline-none focus:border-copper">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
