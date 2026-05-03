import { Link, useRouterState } from "@tanstack/react-router";
import { Home, UtensilsCrossed, Images, BookOpen, ShoppingBag } from "lucide-react";

const tabs = [
  { to: "/",       label: "Home",    Icon: Home             },
  { to: "/menu",   label: "Menu",    Icon: UtensilsCrossed  },
  { to: "/order",  label: "Order",   Icon: ShoppingBag      },
  { to: "/gallery",label: "Gallery", Icon: Images           },
  { to: "/about",  label: "Story",   Icon: BookOpen         },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[oklch(0.15_0.03_255)] border-t border-border/60 backdrop-blur-md">
      {/* Safe-area padding for iOS home indicator */}
      <div className="flex items-stretch pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ to, label, Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                active ? "text-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} />
              <span className={`text-[10px] uppercase tracking-[0.15em] leading-none ${active ? "font-semibold" : ""}`}>
                {label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 rounded-full bg-gradient-gold" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
