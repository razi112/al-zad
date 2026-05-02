import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-grill.jpg";
import chicken from "@/assets/dish-chicken.jpg";
import shawarma from "@/assets/dish-shawarma.jpg";
import mezze from "@/assets/dish-mezze.jpg";
import mandi from "@/assets/dish-mandi.jpg";
import wings from "@/assets/dish-wings.jpg";
import burger from "@/assets/dish-burger.jpg";
import interior from "@/assets/interior.jpg";
import chef from "@/assets/chef-grill.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — AL ZAD" },
      { name: "description", content: "Step inside AL ZAD — flames, dishes, and the people behind every plate." },
      { property: "og:title", content: "Gallery — AL ZAD" },
    ],
  }),
  component: GalleryPage,
});

const images = [
  { src: hero, alt: "Flame-grilled chicken", span: "row-span-2 col-span-2" },
  { src: mandi, alt: "Royal mandi platter", span: "" },
  { src: shawarma, alt: "Shawarma royale", span: "" },
  { src: chef, alt: "Chef at the grill", span: "row-span-2" },
  { src: chicken, alt: "Grilled chicken plate", span: "" },
  { src: wings, alt: "Fire & honey wings", span: "" },
  { src: interior, alt: "Restaurant interior", span: "col-span-2" },
  { src: mezze, alt: "Grand mezze platter", span: "" },
  { src: burger, alt: "AL ZAD burger", span: "" },
];

function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
      <header className="text-center max-w-2xl mx-auto">
        <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">Gallery</div>
        <h1 className="font-display text-5xl md:text-6xl">Through the flame.</h1>
        <p className="mt-5 text-muted-foreground">A look inside our kitchen, our plates, and our atmosphere.</p>
      </header>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
        {images.map((img, i) => (
          <figure
            key={i}
            className={`relative overflow-hidden rounded-2xl border border-border group ${img.span}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">{img.alt}</span>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
