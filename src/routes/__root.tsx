import { Outlet, createRootRoute, HeadContent, Scripts, Link, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gradient-gold px-5 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AL ZAD — Quality, not compromised | Flame-grilled chicken" },
      { name: "description", content: "AL ZAD — modern flame kitchen serving slow-marinated, charcoal-grilled chicken, mandi, mezze and wraps. Quality, not compromised." },
      { name: "author", content: "AL ZAD" },
      { property: "og:title", content: "AL ZAD — Quality, not compromised" },
      { property: "og:description", content: "Slow-marinated, charcoal-grilled chicken, mandi, mezze, wraps & burgers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <Outlet />
        <Toaster theme="dark" richColors position="top-center" />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
      <Toaster theme="dark" richColors position="top-center" />
    </>
  );
}
