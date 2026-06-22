import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, Heart, User, MessageCircle, Menu } from "lucide-react";
import { BRANDS } from "@/lib/mock-data";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      {/* Top utility bar */}
      <div className="bg-ink text-bone text-[11px] tracking-[0.18em] font-mono uppercase">
        <div className="mx-auto max-w-7xl px-4 h-7 flex items-center justify-between">
          <span>Free shipping on orders ₹5,000+ across India</span>
          <span className="hidden sm:inline">Workshop hotline · +91 161 4002 200</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="grid place-items-center h-9 w-9 bg-ink text-bone font-display text-xl">M</div>
          <div className="leading-none">
            <div className="font-display text-2xl tracking-wide">MachineWorks</div>
            <div className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">est · industrial parts</div>
          </div>
        </Link>

        <form
          action="/search"
          className="hidden md:flex flex-1 max-w-2xl items-center hairline bg-card focus-within:border-copper transition-colors"
        >
          <Search className="h-4 w-4 ml-3 text-muted-foreground" />
          <input
            name="q"
            placeholder="Search part #, model, brand, diagram # or compatibility…"
            className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="font-mono text-[11px] tracking-[0.15em] uppercase px-4 py-2.5 bg-ink text-bone hover:bg-copper transition-colors">
            Search
          </button>
        </form>

        <nav className="flex items-center gap-1">
          <Link to="/wishlist" className="p-2 hover:text-copper relative" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 grid place-items-center text-[10px] font-mono bg-copper text-copper-foreground rounded-full">3</span>
          </Link>
          <Link to="/cart" className="p-2 hover:text-copper relative" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 grid place-items-center text-[10px] font-mono bg-copper text-copper-foreground rounded-full">7</span>
          </Link>
          <Link to="/support" className="p-2 hover:text-copper hidden sm:inline-flex" aria-label="Support">
            <MessageCircle className="h-5 w-5" />
          </Link>
          <Link to="/auth" className="p-2 hover:text-copper" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
        </nav>
      </div>

      {/* Brand strip nav */}
      <div className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 h-11 flex items-center gap-1 overflow-x-auto scrollbar-thin">
          <Link to="/catalog" className="font-mono text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 hover:text-copper whitespace-nowrap">
            All Parts
          </Link>
          <span className="text-border">|</span>
          {BRANDS.filter(b => b.isBrand).map(b => (
            <Link
              key={b.slug}
              to="/brand/$brand"
              params={{ brand: b.slug }}
              className="font-mono text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 hover:text-copper whitespace-nowrap"
            >
              {b.name}
            </Link>
          ))}
          <span className="text-border">|</span>
          <Link to="/brand/$brand" params={{ brand: "others" }}
            className="font-mono text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 hover:text-copper whitespace-nowrap">
            Categories
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border p-4 space-y-3 bg-background">
          <form action="/search" className="flex hairline">
            <input name="q" className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" placeholder="Search…" />
            <button className="px-3 bg-ink text-bone"><Search className="h-4 w-4" /></button>
          </form>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-4 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="font-display text-3xl">MachineWorks</div>
          <p className="text-sm text-bone/70 mt-2 max-w-sm">
            Workshop-grade sewing machine parts. Stocked in Ludhiana. Shipped pan-India in 48 hours.
          </p>
          <div className="mt-6 flex items-center gap-3 text-[11px] font-mono tracking-[0.18em] uppercase">
            <span className="px-2 py-1 border border-bone/30">GST · 03AAACX0000X1Z2</span>
            <span className="px-2 py-1 border border-bone/30">ISO 9001</span>
          </div>
        </div>
        {[
          { h: "Shop", links: [["All parts","/catalog"],["By brand","/brand/juki"],["By category","/brand/others"],["Sales","/sales"]] },
          { h: "Help", links: [["Support","/support"],["Shipping & GST","/shipping"],["Returns","/returns"],["Contact","/contact"]] },
          { h: "Account", links: [["Sign in","/auth"],["My orders","/orders"],["Wishlist","/wishlist"],["Admin","/admin"]] },
        ].map(col => (
          <div key={col.h}>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-copper">{col.h}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map(([t, href]) => (
                <li key={href}><a href={href} className="hover:text-copper">{t}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-bone/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-[11px] font-mono tracking-[0.15em] uppercase text-bone/60">
          <span>© 2026 MachineWorks Industries</span>
          <span>Ludhiana · Punjab · India</span>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
