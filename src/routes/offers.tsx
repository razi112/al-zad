import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Tag, Clock, Gift } from "lucide-react";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Deals — AL ZAD" },
      { name: "description", content: "Limited-time offers, family bundles and weekday specials at AL ZAD." },
      { property: "og:title", content: "Offers & Deals — AL ZAD" },
    ],
  }),
  component: OffersPage,
});

const offers = [
  {
    icon: Gift,
    tag: "Family Bundle",
    title: "Feast for Four",
    price: "199 SAR",
    old: "260 SAR",
    desc: "2 whole grilled chickens, 2 mandi rice, mezze platter, 4 drinks.",
    expires: "Daily 5pm – 11pm",
  },
  {
    icon: Clock,
    tag: "Lunch Hour",
    title: "Quick Lunch Combo",
    price: "39 SAR",
    old: "55 SAR",
    desc: "Shawarma royale + side + drink. Mon–Fri, 12–3pm only.",
    expires: "Weekdays only",
  },
  {
    icon: Tag,
    tag: "Wing Wednesday",
    title: "Buy One Get One Wings",
    price: "28 SAR",
    old: "56 SAR",
    desc: "Order any wing platter and get the second on us. Every Wednesday.",
    expires: "Wednesdays",
  },
];

function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
      <header className="text-center max-w-2xl mx-auto">
        <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">This Week</div>
        <h1 className="font-display text-5xl md:text-6xl">Offers & feasts.</h1>
        <p className="mt-5 text-muted-foreground">
          Limited-time bundles built for hunger. Same flame, same standard — better price.
        </p>
      </header>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {offers.map((o) => (
          <div key={o.title} className="relative rounded-2xl border border-gold/30 bg-card overflow-hidden hover-lift">
            <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "var(--gradient-radial-glow)" }} />
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl grid place-items-center bg-gold/10 text-gold border border-gold/30">
                  <o.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold">{o.tag}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl">{o.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-display text-gradient-gold">{o.price}</span>
                <span className="text-sm text-muted-foreground line-through">{o.old}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{o.expires}</div>
              <Button asChild variant="gold" className="mt-6 w-full">
                <Link to="/order">Claim this offer</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
