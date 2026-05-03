import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-[oklch(0.13_0.03_255)]">
      <div className="gold-divider absolute top-0 inset-x-0" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Logo className="h-14 w-14" />
            <div>
              <div className="font-display text-2xl text-gradient-gold">AL ZAD</div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Quality — not compromised
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            A modern flame kitchen rooted in tradition. Every bird is hand-selected,
            slow-marinated, and grilled over open coals — the way it should be.
          </p>
          <div className="mt-6 flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 grid place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition-colors"
                aria-label="Social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-gold text-sm uppercase tracking-[0.25em] mb-5">Explore</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/order" className="hover:text-gold">Order Online</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold text-sm uppercase tracking-[0.25em] mb-5">Visit</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold" /> Al Olaya Street, Riyadh</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /><a href="tel:+917306894157" className="hover:text-gold transition-colors">+91 73068 94157</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> hello@alzad.co</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AL ZAD. All rights reserved.
      </div>
    </footer>
  );
}
