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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <header className="text-center max-w-2xl mx-auto">
        <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">Get in touch</div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">Come hungry. Leave happy.</h1>
        <p className="mt-4 sm:mt-5 text-muted-foreground text-sm sm:text-base">Reservations, just a craving — we're here.</p>
      </header>

      <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="space-y-4 sm:space-y-6">
          {[
            { Icon: MapPin, title: "Visit", lines: ["Al Zad Restaurant", "Kulangara, Eranhimavu, Kerala"] },
            { Icon: Phone, title: "Call", lines: ["+91 73068 94157", "Daily 12am – 11pm"] },
            { Icon: Mail, title: "Email", lines: ["hello@alzad.co"] },
            { Icon: Clock, title: "Hours", lines: ["Mon–Sun · 11:00 – 23:00"] },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-4 sm:p-6 flex gap-3 sm:gap-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl grid place-items-center bg-gold/10 text-gold border border-gold/30">
                <c.Icon className="h-4 w-4 sm:h-5 sm:w-5" />
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
            href="https://wa.me/917306894157"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/5 hover:bg-gold/10 p-4 sm:p-5 transition"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl grid place-items-center bg-gradient-gold text-primary-foreground">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="font-display text-base sm:text-lg">Chat on WhatsApp</div>
              <div className="text-xs text-muted-foreground">Quick replies, every day until 11pm.</div>
            </div>
          </a>

          <a
            href="tel:+917306894157"
            className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/5 hover:bg-gold/10 p-4 sm:p-5 transition"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl grid place-items-center bg-gradient-gold text-primary-foreground">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <div className="font-display text-base sm:text-lg">Call Us</div>
              <div className="text-xs text-muted-foreground">+91 73068 94157 · Daily 11am – 11pm</div>
            </div>
          </a>

          <div className="rounded-2xl overflow-hidden border border-border aspect-[16/10]">
            <iframe
              title="AL ZAD location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.0099844%2C11.2694331%2C76.0199844%2C11.2794331&layer=mapnik&marker=11.2744331%2C76.0149844"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/vZs6DcfMYRiw6yj8A"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/5 hover:bg-gold/10 py-3 text-sm text-gold font-medium transition"
          >
            <MapPin className="h-4 w-4" />
            View on Google Maps
          </a>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 sm:p-8 space-y-4 sm:space-y-5 self-start">
          <h2 className="font-display text-xl sm:text-2xl">Send a message</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <Textarea id="m" required rows={5} className="mt-2" />
          </div>
          <Button type="submit" variant="gold" size="lg" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
