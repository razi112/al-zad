import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 sm:mt-32 border-t border-border/60 bg-[oklch(0.13_0.03_255)]">
      <div className="gold-divider absolute top-0 inset-x-0" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-12 sm:h-14 sm:w-14" />
            <div>
              <div className="font-display text-xl sm:text-2xl text-gradient-gold">AL ZAD</div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Quality — not compromised
              </div>
            </div>
          </div>
          <p className="mt-5 sm:mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            A modern flame kitchen rooted in tradition. Every bird is hand-selected,
            slow-marinated, and grilled over open coals — the way it should be.
          </p>
          <div className="mt-5 sm:mt-6 flex gap-3 sm:gap-4">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/al_zad_kulangara_", label: "Instagram" },
              { Icon: Facebook,  href: "#", label: "Facebook" },
              { Icon: Twitter,   href: "#", label: "Twitter" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 sm:h-10 sm:w-10 grid place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition-colors"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-gold text-sm uppercase tracking-[0.25em] mb-4 sm:mb-5">Explore</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-sm text-muted-foreground">
            <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/order" className="hover:text-gold">Order Online</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold text-sm uppercase tracking-[0.25em] mb-4 sm:mb-5">Visit</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" /> Kulangara, Eranhimavu, Kerala</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold shrink-0" /><a href="tel:+917306894157" className="hover:text-gold transition-colors">+91 73068 94157</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold shrink-0" /> hello@alzad.co</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 sm:py-6 text-center text-xs text-muted-foreground px-4">
        © {new Date().getFullYear()} AL ZAD. All rights reserved.
      </div>
    </footer>
  );
}
