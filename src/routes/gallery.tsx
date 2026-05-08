import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { X, Image as ImageIcon } from "lucide-react";

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

type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  category: "Photo" | "Dish" | "Ambience";
  tags: string[];
  span: string;
};

const images: GalleryImage[] = [
  { src: "/images/image.jpeg", alt: "AL ZAD signature dish",    title: "Signature Plate",        category: "Dish",     tags: ["#signature", "#grill", "#alzad"],   span: "row-span-2 col-span-2" },
  { src: "/images/1.jpeg",     alt: "AL ZAD kitchen moments",   title: "Kitchen Moments",        category: "Photo",    tags: ["#kitchen", "#craft", "#fire"],      span: "" },
  { src: "/images/2.jpeg",     alt: "AL ZAD dining experience", title: "Dining Experience",      category: "Ambience", tags: ["#dine", "#ambience", "#alzad"],     span: "" },
  { src: "/images/3.jpeg",     alt: "AL ZAD grilled special",   title: "Grilled Special",        category: "Dish",     tags: ["#grilled", "#special", "#flame"],   span: "row-span-2" },
  { src: "/images/4.jpeg",     alt: "AL ZAD fresh flavours",    title: "Fresh Flavours",         category: "Dish",     tags: ["#fresh", "#flavour", "#halal"],     span: "" },
  { src: "/images/5.jpeg",     alt: "AL ZAD restaurant vibes",  title: "Restaurant Vibes",       category: "Ambience", tags: ["#vibes", "#interior", "#kulangara"], span: "" },
];

const CATEGORY_COLORS: Record<GalleryImage["category"], string> = {
  Photo:    "bg-blue-500 text-white",
  Dish:     "bg-gold text-primary-foreground",
  Ambience: "bg-amber-700/80 text-white",
};

const CATEGORY_ICONS: Record<GalleryImage["category"], React.ElementType> = {
  Photo:    ImageIcon,
  Dish:     ImageIcon,
  Ambience: ImageIcon,
};

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) {
  const CatIcon = CATEGORY_ICONS[image.category];

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
      style={{ animation: "lightboxBackdropIn 0.25s ease both" }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-2xl max-h-[92vh] overflow-y-auto"
        style={{ animation: "lightboxPopIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-black/60 border border-white/20 grid place-items-center text-white hover:bg-black/80 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image */}
        <img
          src={image.src}
          alt={image.alt}
          className="w-full max-h-[60vh] object-cover"
        />

        {/* Info panel */}
        <div className="px-5 py-4 space-y-3">
          {/* Category + source badges */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[image.category]}`}>
              <CatIcon className="h-3 w-3" />
              {image.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs border border-border text-muted-foreground">
              Gallery
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-xl text-foreground leading-snug">
            {image.title}
          </h2>

          {/* Sub-caption */}
          <p className="text-sm text-muted-foreground">AL ZAD Restaurant — Gallery</p>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Tags */}
          <div className="flex items-center justify-end flex-wrap gap-2">
            {image.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-[11px] border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Gallery page ──────────────────────────────────────────────────────────────
function GalleryPage() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
        <header className="text-center max-w-2xl mx-auto">
          <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">Gallery</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">Through the flame.</h1>
          <p className="mt-4 sm:mt-5 text-muted-foreground text-sm sm:text-base">A look inside our kitchen, our plates, and our atmosphere.</p>
        </header>

        {/* Mobile: simple 2-col grid, no spans. Tablet+: masonry with spans */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[220px] gap-3 sm:gap-4">
          {images.map((img, i) => {
            // Parse span classes and apply only at md+
            const mdSpan = img.span
              .split(" ")
              .map((cls) => `md:${cls}`)
              .join(" ");
            return (
              <figure
                key={i}
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl border border-border group cursor-pointer ${mdSpan}`}
                onClick={() => setSelected(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold">{img.alt}</span>
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      {selected && <Lightbox image={selected} onClose={close} />}
    </>
  );
}
