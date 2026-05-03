import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import chef from "@/assets/chef-grill.jpg";
import interior from "@/assets/interior.jpg";
import { Star, Quote } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — AL ZAD" },
      { name: "description", content: "AL ZAD — a modern flame kitchen built on tradition, patience and uncompromising quality." },
      { property: "og:title", content: "Our Story — AL ZAD" },
    ],
  }),
  component: AboutPage,
});

const reviews = [
  { name: "Sara A.", rating: 5, text: "Best grilled chicken in the city. The mandi is unreal — every grain of rice carries flavor." },
  { name: "Khalid M.", rating: 5, text: "You can taste the patience. 24h marinade is no joke." },
  { name: "Layla K.", rating: 5, text: "Cozy interior, attentive staff and the wings… don't get me started on the wings." },
];

function AboutPage() {
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0">
          <img src={interior} alt="" className="w-full h-full object-cover opacity-40" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-10 py-24 sm:py-32 text-center">
          <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4">Est. 2018</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-tight">
            A kitchen built on
            <span className="block text-gradient-gold italic">fire and patience.</span>
          </h1>
          <p className="mt-6 sm:mt-8 text-muted-foreground leading-relaxed text-base sm:text-lg">
            AL ZAD began with a simple promise — quality, not compromised.
            One grill, one bird, one philosophy: time and fire do the work that no shortcut ever could.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elev">
            <img src={chef} alt="Our chef" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">From a single grill to a destination.</h2>
            <p className="mt-5 sm:mt-6 text-muted-foreground leading-relaxed">
              What started as a neighborhood kitchen has become a destination for those
              who can taste the difference between fast and finished.
            </p>
            <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4 text-center">
              {[
                { n: "24h", l: "Marinade" },
                { n: "100%", l: "Halal" },
                { n: "8yr", l: "Crafting" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-border bg-card/50 p-3 sm:p-5">
                  <div className="font-display text-2xl sm:text-3xl text-gradient-gold">{s.n}</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">Guests say</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Loved by those who know.</h2>
          </div>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {reviews.map((r) => (
              <figure key={r.name} className="relative rounded-2xl border border-border bg-card p-6 sm:p-8">
                <Quote className="h-7 w-7 sm:h-8 sm:w-8 text-gold/40" />
                <blockquote className="mt-3 sm:mt-4 text-foreground/90 leading-relaxed text-sm sm:text-base">"{r.text}"</blockquote>
                <figcaption className="mt-5 sm:mt-6 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">— {r.name}</span>
                  <span className="flex text-gold">
                    {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />)}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Button asChild variant="gold" size="lg" className="sm:h-14 sm:px-10"><Link to="/order">Taste the difference</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
