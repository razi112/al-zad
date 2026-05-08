import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { menu, categories, type MenuItem } from "@/data/menu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — AL ZAD | Flame-grilled signatures" },
      { name: "description", content: "Explore the AL ZAD menu — signatures, mandi platters, mezze, wraps, wings and burgers." },
      { property: "og:title", content: "Menu — AL ZAD" },
      { property: "og:description", content: "Signatures from the flame — mandi, mezze, wraps and more." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const items = active === "All" ? menu : menu.filter((m) => m.category === active);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <header className="text-center max-w-3xl mx-auto">
        <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4">Our Menu</div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">Forged in flame.</h1>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Every dish at AL ZAD is built around one belief — quality is non-negotiable.
          Browse our signatures and order what calls you.
        </p>
      </header>

      <div className="mt-10 sm:mt-14 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 sm:gap-3 sm:flex-wrap sm:justify-center w-max sm:w-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs uppercase tracking-[0.2em] border transition-all ${
                active === c
                  ? "bg-gradient-gold text-primary-foreground border-transparent shadow-gold"
                  : "border-border text-muted-foreground hover:text-gold hover:border-gold/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function Card({ item }: { item: MenuItem }) {
  return (
    <article className="group rounded-2xl overflow-hidden border border-border bg-card hover-lift flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {item.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-gold text-primary-foreground text-[10px] uppercase tracking-[0.2em] font-semibold">
            {item.badge}
          </div>
        )}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass border border-border text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {item.category}
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg sm:text-xl">{item.name}</h3>
          <span className="text-gold font-semibold whitespace-nowrap shrink-0">
            {item.sizes ? `from ₹${item.price}` : `₹${item.price}`}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>

        {/* Size pricing table — scrollable on tiny screens */}
        {item.sizes && (
          <div className="mt-4 grid grid-cols-4 gap-1.5 overflow-x-auto">
            {item.sizes.map((s) => (
              <div key={s.label} className="rounded-lg border border-border/70 bg-background/40 p-2 text-center min-w-[56px]">
                <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{s.label}</div>
                <div className="text-xs font-semibold text-gold mt-0.5">₹{s.price}</div>
              </div>
            ))}
          </div>
        )}

        <Button asChild variant="outlineGold" size="sm" className="mt-4 sm:mt-5 self-start">
          <Link to="/order"><Plus className="h-3.5 w-3.5" /> Add to order</Link>
        </Button>
      </div>
    </article>
  );
}
