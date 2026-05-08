import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Flame, Award, Leaf, ChefHat, ArrowRight, Star, Quote } from "lucide-react";
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

// ── Malayalam feedback data ───────────────────────────────────────────────────
const feedbacks = [
  { name: "അർജുൻ കൃഷ്ണ",    stars: 5, text: "ഇവിടുത്തെ ഗ്രിൽഡ് ചിക്കൻ ഒരു വാക്കിൽ പറഞ്ഞാൽ അദ്ഭുതം! ഇത്ര രുചിയുള്ള ഭക്ഷണം ഞാൻ ഇതുവരെ കഴിച്ചിട്ടില്ല." },
  { name: "ഫാത്തിമ നൂർ",     stars: 5, text: "ഷവർമ ഒരു തവണ കഴിച്ചാൽ മതി, വീണ്ടും വരണം എന്ന് തോന്നും. AL ZAD-ന്റെ ഭക്ഷണം ഹൃദയം കവരുന്നതാണ്." },
  { name: "വിഷ്ണു പ്രസാദ്",  stars: 5, text: "മണ്ടി പ്ലേറ്റർ ഒരു ഉത്സവ വിഭവം പോലെ തോന്നി. കുടുംബത്തോടൊപ്പം ഇവിടെ വരുന്നത് ഒരു ആഘോഷം തന്നെ." },
  { name: "സൈനബ് ഷെരീഫ്",   stars: 5, text: "ഭക്ഷണത്തിന്റെ ഗുണനിലവാരം ഒരിക്കലും കുറഞ്ഞിട്ടില്ല. ഓരോ തവണ വരുമ്പോഴും ഒരേ ഗുണം — ഇതാണ് AL ZAD-ന്റെ പ്രത്യേകത." },
  { name: "അഭിഷേക് മേനോൻ",  stars: 5, text: "ഫയർ & ഹണി വിംഗ്സ് ഒരു അടിപൊളി അനുഭവം! ഓൺലൈൻ ഓർഡർ ചെയ്ത് ഡെലിവറി ഒരു മണിക്കൂറിനുള്ളിൽ കിട്ടി." },
  { name: "മറിയം ഹസൻ",      stars: 5, text: "ഇന്റീരിയർ വളരെ സുന്ദരം, അന്തരീക്ഷം ഊഷ്മളം. ഭക്ഷണം കഴിക്കുന്നത് ഒരു അനുഭവമാക്കി മാറ്റുന്ന ഇടം." },
  { name: "രോഹൻ ദേവ്",      stars: 5, text: "AL ZAD ബർഗർ ഒരു ഗെയിം ചേഞ്ചർ ആണ്. ഇത്ര ജ്യൂസി ആയ ബർഗർ ഇവിടെ മാത്രമേ കിട്ടൂ." },
  { name: "ആഇഷ ഫർഹാൻ",     stars: 5, text: "ഗ്രാൻഡ് മെസ്സ് പ്ലേറ്റർ ഒരു കൂട്ടം ആളുകൾക്ക് ഒരുമിച്ച് ആസ്വദിക്കാൻ ഏറ്റവും നല്ലത്. ഓരോ ഡിഷും ഒരു കലാസൃഷ്ടി." },
];

// Split into two columns for the dual-track scroll — kept for reference
// const col1 = feedbacks.slice(0, 4);
// const col2 = feedbacks.slice(4);

function FeedbackCard({ item }: { item: (typeof feedbacks)[0] }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3 shrink-0">
      <Quote className="h-5 w-5 text-gold/60" />
      <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
      <div className="flex items-center justify-between gap-3 pt-1">
        <div>
          <div className="text-sm font-semibold text-foreground">{item.name}</div>
          <div className="flex gap-0.5 mt-0.5">
            {Array.from({ length: item.stars }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-gold text-gold" />
            ))}
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold/70 border border-gold/20 px-2 py-0.5 rounded-full">
          AL ZAD
        </span>
      </div>
    </div>
  );
}

function FeedbackSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">Comments</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">What You Said</h2>
          <p className="mt-3 sm:mt-4 text-muted-foreground max-w-md mx-auto text-sm">
           Words from those who have enjoyed our food — from the heart.
          </p>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-3 sm:gap-4 w-max animate-scroll-left">
          {[...feedbacks, ...feedbacks].map((item, i) => (
            <div key={i} className="w-[280px] sm:w-[320px]">
              <FeedbackCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative mt-3 sm:mt-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-3 sm:gap-4 w-max animate-scroll-right">
          {[...feedbacks, ...feedbacks].map((item, i) => (
            <div key={i} className="w-[280px] sm:w-[320px]">
              <FeedbackCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-10 pt-16 pb-16 sm:py-24">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-gold text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em]">
              <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Open Flame Kitchen
            </div>
            <h1 className="mt-5 sm:mt-6 font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05]">
              Where every flame
              <span className="block text-gradient-gold italic">tells a story.</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Slow-marinated for 24 hours, kissed by charcoal, served with reverence.
              At AL ZAD, quality isn't a promise — it's the only standard.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <Button asChild variant="gold" size="lg" className="sm:h-14 sm:px-10">
                <Link to="/order">Order Now <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outlineGold" size="lg" className="sm:h-14 sm:px-10">
                <Link to="/menu">Explore Menu</Link>
              </Button>
            </div>

            <div className="mt-10 sm:mt-14 flex items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-1.5 text-gold">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />)}
              </div>
              <div>
                <span className="text-foreground font-semibold">4.9</span> · 2,400+ reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-14 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Flame, title: "Charcoal Grilled", desc: "Open-flame craft, never shortcuts." },
              { icon: Leaf, title: "24h Marinated", desc: "Aromatics, citrus & secret spice." },
              { icon: Award, title: "Quality Promise", desc: "Hand-selected, halal, locally sourced." },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card/50 hover-lift"
              >
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl grid place-items-center bg-gold/10 text-gold border border-gold/30">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-display">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-4 sm:gap-6 mb-10 sm:mb-14">
            <div>
              <div className="text-gold text-xs uppercase tracking-[0.3em] mb-2 sm:mb-3">The Menu</div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Signatures from the flame</h2>
            </div>
            <Button asChild variant="outlineGold" size="sm">
              <Link to="/menu">View full menu <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
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
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-gold text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-semibold">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg sm:text-xl">{item.name}</h3>
                    <span className="text-gold font-semibold whitespace-nowrap">₹{item.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF / STORY */}
      <section className="py-14 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elev">
            <img src={chef} alt="Chef grilling chicken" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          <div>
            <ChefHat className="h-9 w-9 sm:h-10 sm:w-10 text-gold" />
            <h2 className="mt-5 sm:mt-6 font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
              Crafted by hands
              <span className="block text-gradient-gold italic">that never settle.</span>
            </h2>
            <p className="mt-5 sm:mt-6 text-muted-foreground leading-relaxed">
              Behind every dish is a kitchen that refuses compromise. We grind our spices fresh,
              we burn real charcoal, and we wait for the bird to be ready — never the clock.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This is more than a meal. It's a tradition kept alive by fire and patience.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-8 sm:mt-10">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="relative rounded-2xl sm:rounded-3xl border border-gold/40 bg-card/40 px-6 py-10 sm:p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-radial-glow)" }} />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">Hungry already?</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Skip the line. Order ahead and pick up your feast — or have it delivered straight to your table.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 justify-center">
              <Button asChild variant="gold" size="lg" className="sm:h-14 sm:px-10"><Link to="/order">Order Now</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <FeedbackSection />
    </>
  );
}
