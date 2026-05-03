import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Flame, Award, Leaf, ChefHat, ArrowRight, Star } from "lucide-react";
import hero from "@/assets/hero-grill.jpg";
import chef from "@/assets/chef-grill.jpg";
import { menu } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AL ZAD — Flame-grilled chicken, quality not compromised" },
      { name: "description", content: "Slow-marinated, charcoal-grilled chicken. Mandi, mezze, shawarma & burgers crafted with quality that's never compromised." },
      { property: "og:title", content: "AL ZAD — Flame-grilled chicken" },
      { property: "og:description", content: "Quality, not compromised. Slow-marinated and charcoal-grilled." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = menu.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Flame-grilled chicken over charcoal"
            className="w-full h-full object-cover opacity-70"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-10 py-24">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-gold text-xs uppercase tracking-[0.3em]">
              <Flame className="h-3.5 w-3.5" /> Open Flame Kitchen
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05]">
              Where every flame
              <span className="block text-gradient-gold italic">tells a story.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Slow-marinated for 24 hours, kissed by charcoal, served with reverence.
              At AL ZAD, quality isn't a promise — it's the only standard.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/order">Order Now <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outlineGold" size="xl">
                <Link to="/menu">Explore Menu</Link>
              </Button>
            </div>

            <div className="mt-14 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 text-gold">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <div>
                <span className="text-foreground font-semibold">4.9</span> · 2,400+ reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Flame, title: "Charcoal Grilled", desc: "Open-flame craft, never shortcuts." },
              { icon: Leaf, title: "24h Marinated", desc: "Aromatics, citrus & secret spice." },
              { icon: Award, title: "Quality Promise", desc: "Hand-selected, halal, locally sourced." },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative p-8 rounded-2xl border border-border bg-card/50 hover-lift"
              >
                <div className="h-12 w-12 rounded-xl grid place-items-center bg-gold/10 text-gold border border-gold/30">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-display">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">The Menu</div>
              <h2 className="font-display text-4xl md:text-5xl">Signatures from the flame</h2>
            </div>
            <Button asChild variant="outlineGold">
              <Link to="/menu">View full menu <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((item) => (
              <article
                key={item.id}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {item.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-gold text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-semibold">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl">{item.name}</h3>
                    <span className="text-gold font-semibold">₹{item.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF / STORY */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elev">
            <img src={chef} alt="Chef grilling chicken" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          <div>
            <ChefHat className="h-10 w-10 text-gold" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
              Crafted by hands
              <span className="block text-gradient-gold italic">that never settle.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Behind every dish is a kitchen that refuses compromise. We grind our spices fresh,
              we burn real charcoal, and we wait for the bird to be ready — never the clock.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This is more than a meal. It's a tradition kept alive by fire and patience.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-10">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="relative rounded-3xl border border-gold/40 bg-card/40 p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-radial-glow)" }} />
            <h2 className="font-display text-4xl md:text-5xl">Hungry already?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Skip the line. Order ahead and pick up your feast — or have it delivered straight to your table.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button asChild variant="gold" size="xl"><Link to="/order">Order Now</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
