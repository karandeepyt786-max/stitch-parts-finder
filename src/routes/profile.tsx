import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { User, MapPin, CreditCard, Bell, LogOut } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Account — MachineWorks" }] }),
  component: Profile,
});

function Profile() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
          <Link to="/" className="hover:text-copper">Home</Link> / Account
        </nav>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 grid place-items-center bg-ink text-bone font-display text-2xl">AS</div>
          <div>
            <h1 className="font-display text-5xl">Amit Sharma</h1>
            <p className="text-muted-foreground text-sm">amit@example.com · +91-9876543210</p>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <Card Icon={User} title="Profile">Edit your name, email and phone.</Card>
          <Card Icon={MapPin} title="Addresses">2 saved shipping addresses.</Card>
          <Card Icon={CreditCard} title="Payment methods">UPI · amit@upi · Visa ••1234</Card>
          <Card Icon={Bell} title="Notifications">Order updates & sale alerts.</Card>
          <Link to="/orders" className="hairline bg-card p-5 hover:border-ink block">
            <div className="font-display text-3xl text-copper">14</div>
            <div className="font-mono text-[11px] tracking-widest uppercase mt-1">Orders placed</div>
          </Link>
          <Link to="/wishlist" className="hairline bg-card p-5 hover:border-ink block">
            <div className="font-display text-3xl text-copper">3</div>
            <div className="font-mono text-[11px] tracking-widest uppercase mt-1">Wishlist items</div>
          </Link>
        </div>

        <div className="mt-8">
          <button className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive inline-flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    </PageShell>
  );
}

function Card({ Icon, title, children }: { Icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="hairline bg-card p-5 hover:border-ink cursor-pointer">
      <Icon className="h-5 w-5 text-copper" />
      <div className="font-display text-2xl mt-2">{title}</div>
      <p className="text-sm text-muted-foreground mt-1">{children}</p>
    </div>
  );
}
