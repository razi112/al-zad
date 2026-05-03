import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { menu, type MenuItem, type SizeVariant } from "@/data/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Minus, Trash2, ShoppingBag, CheckCircle2, Phone } from "lucide-react";
import { toast } from "sonner";
import { saveOrder, generateOrderId, buildOrderLines } from "@/lib/orders";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online — AL ZAD" },
      { name: "description", content: "Order flame-grilled chicken, mandi, mezze and wraps from AL ZAD for delivery or pickup." },
      { property: "og:title", content: "Order Online — AL ZAD" },
    ],
  }),
  component: OrderPage,
});

// Cart key = "itemId::sizeLabel" (or just "itemId" for items without sizes)
type CartLine = { item: MenuItem; size?: SizeVariant; qty: number; key: string };

function cartKey(id: string, sizeLabel?: string) {
  return sizeLabel ? `${id}::${sizeLabel}` : id;
}

function OrderPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  // Track selected size per item card
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      menu.filter((m) => m.sizes).map((m) => [m.id, m.sizes![0].label])
    )
  );
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [placed, setPlaced] = useState(false);

  // Form field refs for reading values on submit
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addrRef = useRef<HTMLInputElement>(null);

  const lines: CartLine[] = useMemo(() => {
    return Object.entries(cart).map(([key, qty]) => {
      const [id, sizeLabel] = key.split("::");
      const item = menu.find((m) => m.id === id)!;
      const size = sizeLabel ? item.sizes?.find((s) => s.label === sizeLabel) : undefined;
      return { item, size, qty, key };
    });
  }, [cart]);

  const subtotal = lines.reduce((s, l) => s + (l.size?.price ?? l.item.price) * l.qty, 0);
  const fee = mode === "delivery" && subtotal > 0 ? 50 : 0;
  const total = subtotal + fee;

  const add = (id: string, sizeLabel?: string) => {
    const k = cartKey(id, sizeLabel);
    setCart((c) => ({ ...c, [k]: (c[k] ?? 0) + 1 }));
  };
  const sub = (key: string) =>
    setCart((c) => {
      const n = (c[key] ?? 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[key];
      else next[key] = n;
      return next;
    });
  const remove = (key: string) =>
    setCart((c) => {
      const n = { ...c };
      delete n[key];
      return n;
    });

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    // Persist order to localStorage for admin dashboard
    saveOrder({
      id: generateOrderId(),
      placedAt: new Date().toISOString(),
      status: "new",
      mode,
      name: nameRef.current?.value ?? "",
      phone: phoneRef.current?.value ?? "",
      address: mode === "delivery" ? (addrRef.current?.value ?? "") : undefined,
      lines: buildOrderLines(cart, menu),
      subtotal,
      fee,
      total,
    });
    setPlaced(true);
    toast.success("Order placed! We'll text you when it's ready.");
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <CheckCircle2 className="h-16 w-16 text-gold mx-auto" />
        <h1 className="mt-6 font-display text-4xl">Order received</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you. Your feast is on the flame.
          {mode === "delivery" ? " Estimated delivery: 35–45 min." : " Pickup ready in ~20 min."}
        </p>
        <p className="mt-2 text-gold">Total: ₹{total}</p>
        <Button variant="gold" className="mt-8" onClick={() => { setPlaced(false); setCart({}); }}>
          Place another order
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
      <header className="text-center max-w-2xl mx-auto">
        <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">Order Online</div>
        <h1 className="font-display text-4xl sm:text-5xl">Build your feast.</h1>
      </header>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Items */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {menu.map((m) => {
            const activeSizeLabel = selectedSize[m.id];
            const activeSize = m.sizes?.find((s) => s.label === activeSizeLabel);
            const displayPrice = activeSize?.price ?? m.price;
            const activeKey = cartKey(m.id, activeSizeLabel);

            return (
              <div key={m.id} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
                <div className="flex">
                  <img src={m.image} alt={m.name} loading="lazy" className="w-28 sm:w-32 h-full object-cover shrink-0" />
                  <div className="p-3 sm:p-4 flex flex-col flex-1 min-w-0">
                    <h3 className="font-display text-base sm:text-lg leading-tight">{m.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.description}</p>
                    <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                      <span className="text-gold font-semibold text-sm sm:text-base">₹{displayPrice}</span>
                      {cart[activeKey] ? (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button onClick={() => sub(activeKey)} className="h-7 w-7 sm:h-8 sm:w-8 grid place-items-center rounded-full border border-border hover:border-gold hover:text-gold">
                            <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm">{cart[activeKey]}</span>
                          <button onClick={() => add(m.id, activeSizeLabel)} className="h-7 w-7 sm:h-8 sm:w-8 grid place-items-center rounded-full bg-gradient-gold text-primary-foreground">
                            <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Button onClick={() => add(m.id, activeSizeLabel)} variant="outlineGold" size="sm" className="text-xs px-2.5 sm:px-3">
                          <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Add
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Size selector */}
                {m.sizes && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 flex gap-1.5 sm:gap-2 flex-wrap border-t border-border/50 mt-1">
                    {m.sizes.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => setSelectedSize((prev) => ({ ...prev, [m.id]: s.label }))}
                        className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          activeSizeLabel === s.label
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-border text-muted-foreground hover:border-gold/50"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cart */}
        <aside className="lg:sticky lg:top-28 self-start rounded-2xl border border-border bg-card/70 p-5 sm:p-6">
          <h2 className="font-display text-xl sm:text-2xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold" /> Your Order
          </h2>

          {lines.length === 0 ? (
            <p className="mt-5 sm:mt-6 text-sm text-muted-foreground">Your cart is empty. Add a dish to begin.</p>
          ) : (
            <ul className="mt-4 sm:mt-5 space-y-3">
              {lines.map((l) => (
                <li key={l.key} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{l.item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {l.size ? `${l.size.label} · ` : ""}{l.qty} × ₹{l.size?.price ?? l.item.price}
                    </div>
                  </div>
                  <span className="text-gold font-semibold whitespace-nowrap">₹{l.qty * (l.size?.price ?? l.item.price)}</span>
                  <button onClick={() => remove(l.key)} className="text-muted-foreground hover:text-destructive shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="gold-divider my-5 sm:my-6" />

          <form onSubmit={placeOrder} className="space-y-4">
            <div>
              <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Method</Label>
              <RadioGroup value={mode} onValueChange={(v) => setMode(v as "delivery" | "pickup")} className="mt-3 grid grid-cols-2 gap-2">
                {(["delivery", "pickup"] as const).map((m) => (
                  <Label key={m} className={`cursor-pointer rounded-lg border p-3 text-center capitalize text-sm ${mode === m ? "border-gold text-gold" : "border-border text-muted-foreground"}`}>
                    <RadioGroupItem value={m} className="sr-only" /> {m}
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Name</Label>
              <Input id="name" required className="mt-2" placeholder="Your name" ref={nameRef} />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</Label>
              <Input id="phone" required type="tel" className="mt-2" placeholder="+91 ..." ref={phoneRef} />
            </div>
            {mode === "delivery" && (
              <div>
                <Label htmlFor="addr" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Address</Label>
                <Input id="addr" required className="mt-2" placeholder="Street, area, city" ref={addrRef} />
              </div>
            )}

            <div className="space-y-1.5 pt-2 text-sm">
              <Row label="Subtotal" value={`₹${subtotal}`} />
              <Row label={mode === "delivery" ? "Delivery" : "Pickup"} value={fee ? `₹${fee}` : "Free"} />
              <div className="gold-divider my-2" />
              <Row label="Total" value={`₹${total}`} bold />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-2">Place Order</Button>
          </form>

          <div className="gold-divider my-5 sm:my-6" />

          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Prefer to call?</p>
            <a
              href="tel:+917306894157"
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-gold/50 bg-gold/5 hover:bg-gold/15 text-gold font-semibold py-3 transition-colors"
            >
              <Phone className="h-4 w-4" />
              +91 73068 94157
            </a>
            <a
              href="https://wa.me/917306894157"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-border bg-transparent hover:border-green-500/50 hover:text-green-400 text-muted-foreground text-sm font-medium py-2.5 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-gold font-semibold text-base" : "text-muted-foreground"}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
