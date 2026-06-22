import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-shell";
import { MessageCircle, Send, Phone, MapPin, Image as ImageIcon, Wrench, Globe, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support — MachineWorks" }] }),
  component: Support,
});

const presets = [
  { id: "machine", label: "Machine", Icon: Wrench },
  { id: "machine_part", label: "Machine part", Icon: Wrench },
  { id: "website", label: "Website", Icon: Globe },
  { id: "other", label: "Other", Icon: HelpCircle },
];

function Support() {
  const [subject, setSubject] = useState("machine_part");
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
          <Link to="/" className="hover:text-copper">Home</Link> / Support
        </nav>
        <h1 className="font-display text-6xl">Live tech support</h1>
        <p className="text-muted-foreground mt-2">Open a ticket — average first reply 2 minutes.</p>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <form className="lg:col-span-7 hairline bg-card p-6 space-y-5">
            <div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground mb-2">Subject</div>
              <div className="grid grid-cols-4 gap-2">
                {presets.map(p => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSubject(p.id)}
                    className={`hairline p-3 flex flex-col items-center gap-1.5 transition-colors ${
                      subject === p.id ? "bg-ink text-bone border-ink" : "hover:bg-secondary"
                    }`}
                  >
                    <p.Icon className="h-4 w-4" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field icon={Phone} label="Contact number" placeholder="+91 98xxxxxxxx" />
              <Field icon={MapPin} label="Location" placeholder="Ludhiana, Punjab" />
            </div>
            <Field label="Describe the issue" placeholder="What went wrong? Include SKU if applicable." textarea />
            <label className="hairline border-dashed bg-secondary/30 p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-ink">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
              <div className="font-mono text-[11px] uppercase tracking-widest">Drop an image · or click to upload</div>
              <input type="file" hidden />
            </label>
            <button className="w-full h-12 bg-ink text-bone hover:bg-copper transition-colors font-mono text-xs uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2">
              <Send className="h-4 w-4" /> Send & start live chat
            </button>
          </form>

          <aside className="lg:col-span-5">
            <div className="hairline bg-card flex flex-col h-[500px]">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-copper" />
                <div className="font-mono text-[11px] uppercase tracking-widest">Live chat preview</div>
                <span className="ml-auto h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="font-mono text-[10px] text-muted-foreground">Online</span>
              </div>
              <div className="flex-1 p-5 space-y-3 overflow-auto bg-secondary/30">
                <Msg from="agent" name="Priya · Support" text="Hi! Tell me which part or model you need help with." />
                <Msg from="me" name="You" text="Hi, I'm looking for the upper knife for MO-6716S." />
                <Msg from="agent" name="Priya · Support" text="That's SKU-JUKI-MO6716-KNF — ₹1,180, 24 in stock. Want me to add it to your cart?" />
                <Msg from="me" name="You" text="Yes please, 2 units." />
              </div>
              <div className="border-t border-border p-3 flex items-center gap-2">
                <input className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" placeholder="Type a message…" />
                <button className="h-9 w-9 grid place-items-center bg-ink text-bone hover:bg-copper"><Send className="h-4 w-4" /></button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

function Field({ icon: Icon, label, placeholder, textarea }: any) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">{label}</span>
      <div className="mt-1 hairline bg-background flex items-start focus-within:border-copper">
        {Icon && <Icon className="h-4 w-4 ml-3 mt-3 text-muted-foreground shrink-0" />}
        {textarea ? (
          <textarea rows={4} placeholder={placeholder} className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none resize-none" />
        ) : (
          <input placeholder={placeholder} className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none" />
        )}
      </div>
    </label>
  );
}

function Msg({ from, name, text }: { from: "me" | "agent"; name: string; text: string }) {
  return (
    <div className={`flex flex-col ${from === "me" ? "items-end" : "items-start"}`}>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{name}</div>
      <div className={`max-w-[80%] px-3 py-2 text-sm ${from === "me" ? "bg-ink text-bone" : "bg-card hairline"}`}>{text}</div>
    </div>
  );
}
