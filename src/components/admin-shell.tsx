import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, MessageSquare, BarChart3, Settings, LogOut, Shield } from "lucide-react";

const NAV = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/sales", icon: Tag, label: "Sales" },
  { to: "/admin/issues", icon: MessageSquare, label: "Support" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  const path = useRouterState({ select: s => s.location.pathname });
  return (
    <div className="min-h-screen flex bg-secondary/30">
      <aside className="w-60 bg-ink text-bone flex flex-col sticky top-0 h-screen">
        <Link to="/admin" className="p-5 border-b border-bone/10 flex items-center gap-2">
          <div className="grid place-items-center h-8 w-8 bg-copper text-copper-foreground">
            <Shield className="h-4 w-4" />
          </div>
          <div className="leading-none">
            <div className="font-display text-xl">MachineWorks</div>
            <div className="font-mono text-[9px] tracking-[0.25em] text-bone/60 uppercase">Admin Console</div>
          </div>
        </Link>
        <nav className="flex-1 py-4">
          {NAV.map(item => {
            const active = path === item.to || (item.to !== "/admin" && path.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm border-l-2 transition-colors ${
                  active
                    ? "border-copper bg-bone/5 text-bone"
                    : "border-transparent text-bone/70 hover:text-bone hover:bg-bone/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-bone/10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 grid place-items-center bg-bone/10 font-mono text-xs">PS</div>
            <div className="leading-tight">
              <div className="text-sm">Priya Singh</div>
              <div className="font-mono text-[10px] text-copper uppercase tracking-widest">Superadmin</div>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 text-bone/60 hover:text-bone text-xs">
            <LogOut className="h-3.5 w-3.5" /> Back to store
          </Link>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="bg-background border-b border-border px-8 py-6">
          <h1 className="font-display text-4xl tracking-wide">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </header>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
