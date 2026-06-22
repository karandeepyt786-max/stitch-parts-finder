import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";
import { ISSUES } from "@/lib/mock-data";
import { Send } from "lucide-react";

export const Route = createFileRoute("/admin/issues")({
  head: () => ({ meta: [{ title: "Admin · Support" }] }),
  component: AdminIssues,
});

function AdminIssues() {
  return (
    <AdminShell title="Support tickets" subtitle="Live chat with users on machine, part or website issues">
      <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-220px)]">
        <div className="lg:col-span-4 hairline bg-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <input placeholder="Search tickets…" className="w-full hairline bg-background px-3 py-2 text-sm outline-none" />
          </div>
          <div className="flex-1 overflow-auto">
            {ISSUES.concat(ISSUES).map((i, idx) => (
              <button key={idx} className={`w-full text-left p-4 border-b border-border hover:bg-secondary/40 ${idx===0?"bg-secondary/60":""}`}>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-copper">{i.subject.replace("_"," ")}</div>
                  <span className={`h-2 w-2 rounded-full ${i.status==="open"?"bg-copper":"bg-success"}`} />
                </div>
                <div className="font-medium mt-1">{i.user}</div>
                <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{i.location} · {i.at}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 hairline bg-card flex flex-col">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <div className="font-display text-2xl">Amit Sharma</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">ISS-201 · Machine part · Ludhiana · +91-9876543210</div>
            </div>
            <div className="flex gap-2">
              <select className="hairline bg-background px-3 py-2 font-mono text-[11px] uppercase tracking-widest">
                <option>Open</option><option>In progress</option><option>Resolved</option>
              </select>
              <button className="px-3 py-2 hairline font-mono text-[11px] uppercase tracking-widest hover:bg-secondary">Refund</button>
              <button className="px-3 py-2 hairline font-mono text-[11px] uppercase tracking-widest hover:bg-secondary">Return</button>
            </div>
          </div>
          <div className="flex-1 p-5 space-y-3 overflow-auto bg-secondary/30">
            <Msg from="user" name="Amit Sharma" text="Hi, the upper knife I received for MO-6716S doesn't fit." />
            <Msg from="agent" name="You" text="Sorry to hear that! Can you share a photo of the knife next to the machine slot?" />
            <Msg from="user" name="Amit Sharma" text="[image attached]" />
            <Msg from="agent" name="You" text="I see — that's the older variant. I'll send the correct SKU-JUKI-MO6716-KNF-V2. Free replacement." />
          </div>
          <div className="border-t border-border p-3 flex items-center gap-2">
            <input className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" placeholder="Reply to Amit…" />
            <button className="h-9 px-4 bg-ink text-bone hover:bg-copper font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2"><Send className="h-4 w-4" /> Send</button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function Msg({ from, name, text }: { from: "user" | "agent"; name: string; text: string }) {
  return (
    <div className={`flex flex-col ${from === "agent" ? "items-end" : "items-start"}`}>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{name}</div>
      <div className={`max-w-[80%] px-3 py-2 text-sm ${from === "agent" ? "bg-ink text-bone" : "bg-card hairline"}`}>{text}</div>
    </div>
  );
}
