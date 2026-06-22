import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — MachineWorks" }] }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"in" | "up">("in");
  return (
    <PageShell>
      <div className="grid md:grid-cols-2 min-h-[calc(100vh-200px)]">
        <div className="bg-ink text-bone blueprint-grid p-10 md:p-16 flex flex-col justify-between">
          <Link to="/" className="font-display text-3xl">MachineWorks</Link>
          <div>
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper mb-4">Trade account</div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.85]">
              The workshop's<br />supply room.
            </h2>
            <p className="mt-4 text-bone/70 max-w-sm">
              Track orders, reorder fast, manage GST invoices and get bulk pricing on 50+ unit orders.
            </p>
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-bone/40">
            Trusted by 4,200+ workshops across India
          </div>
        </div>

        <div className="p-10 md:p-16 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-copper mb-2">
              {mode === "in" ? "Welcome back" : "Create account"}
            </div>
            <h1 className="font-display text-5xl">{mode === "in" ? "Sign in" : "Sign up"}</h1>

            <button className="mt-8 w-full h-12 hairline hover:bg-secondary flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest">
              <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-3 text-muted-foreground">
              <div className="flex-1 h-px bg-border" />
              <span className="font-mono text-[10px] uppercase tracking-widest">or email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="space-y-3">
              {mode === "up" && (
                <Field label="Full name" placeholder="Amit Sharma" />
              )}
              <Field label="Email" placeholder="you@workshop.in" type="email" />
              <Field label="Password" placeholder="••••••••" type="password" />
              {mode === "in" && (
                <div className="text-right"><button className="font-mono text-[11px] uppercase tracking-widest hover:text-copper">Forgot?</button></div>
              )}
              <button className="w-full h-12 bg-ink text-bone hover:bg-copper transition-colors font-mono text-xs uppercase tracking-[0.2em]">
                {mode === "in" ? "Sign in" : "Create account"}
              </button>
            </div>

            <p className="mt-6 text-sm text-center text-muted-foreground">
              {mode === "in" ? "New here?" : "Already have an account?"}{" "}
              <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="text-copper underline-offset-4 hover:underline">
                {mode === "in" ? "Create account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{label}</span>
      <input type={type} placeholder={placeholder} className="mt-1 w-full hairline bg-background px-3 py-3 text-sm outline-none focus:border-copper" />
    </label>
  );
}
