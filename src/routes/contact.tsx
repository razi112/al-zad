import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AL ZAD" },
      { name: "description", content: "Visit AL ZAD on Al Olaya Street, Riyadh. Reservations, catering & questions welcome." },
      { property: "og:title", content: "Contact — AL ZAD" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent. We'll get back within 24h.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
      <header className="text-center max-w-2xl mx-auto">
        <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">Get in touch</div>
        <h1 className="font-display text-5xl md:text-6xl">Come hungry. Leave happy.</h1>
        <p className="mt-5 text-muted-foreground">Reservations, catering, or just a craving — we're here.</p>
      </header>

      <div className="mt-16 grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          {[
            { Icon: MapPin, title: "Visit", lines: ["Al Olaya Street", "Riyadh, Saudi Arabia"] },
            { Icon: Phone, title: "Call", lines: ["+966 50 000 0000", "Daily 11am – 1am"] },
            { Icon: Mail, title: "Email", lines: ["hello@alzad.co"] },
            { Icon: Clock, title: "Hours", lines: ["Mon–Sun · 11:00 – 01:00"] },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-xl grid place-items-center bg-gold/10 text-gold border border-gold/30">
                <c.Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-gold text-xs uppercase tracking-[0.25em]">{c.title}</div>
                {c.lines.map((l) => (
                  <div key={l} className="text-sm text-foreground/85 mt-0.5">{l}</div>
                ))}
              </div>
            </div>
          ))}

          <a
            href="https://wa.me/966500000000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/5 hover:bg-gold/10 p-5 transition"
          >
            <div className="h-12 w-12 rounded-xl grid place-items-center bg-gradient-gold text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg">Chat on WhatsApp</div>
              <div className="text-xs text-muted-foreground">Quick replies, every day until midnight.</div>
            </div>
          </a>

          <div className="rounded-2xl overflow-hidden border border-border aspect-[16/10]">
            <iframe
              title="AL ZAD location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=46.65%2C24.68%2C46.72%2C24.72&layer=mapnik"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-8 space-y-5 self-start">
          <h2 className="font-display text-2xl">Send a message</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="n" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Name</Label>
              <Input id="n" required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="e" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</Label>
              <Input id="e" type="email" required className="mt-2" />
            </div>
          </div>
          <div>
            <Label htmlFor="s" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Subject</Label>
            <Input id="s" required className="mt-2" />
          </div>
          <div>
            <Label htmlFor="m" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</Label>
            <Textarea id="m" required rows={6} className="mt-2" />
          </div>
          <Button type="submit" variant="gold" size="lg" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
