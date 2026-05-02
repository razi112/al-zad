import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { menu, type MenuItem } from "@/data/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Minus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

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

type CartLine = { item: MenuItem; qty: number };

function OrderPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [placed, setPlaced] = useState(false);

  const lines: CartLine[] = useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ item: menu.find((m) => m.id === id)!, qty })),
    [cart]
  );
  const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const fee = mode === "delivery" && subtotal > 0 ? 15 : 0;
  const total = subtotal + fee;

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const sub = (id: string) =>
    setCart((c) => {
      const n = (c[id] ?? 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });
  const remove = (id: string) =>
    setCart((c) => {
      const n = { ...c };
      delete n[id];
      return n;
    });

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
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
        <p className="mt-2 text-gold">Total: {total} SAR</p>
        <Button variant="gold" className="mt-8" onClick={() => { setPlaced(false); setCart({}); }}>
          Place another order
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24">
      <header className="text-center max-w-2xl mx-auto">
        <div className="text-gold text-xs uppercase tracking-[0.3em] mb-3">Order Online</div>
        <h1 className="font-display text-5xl">Build your feast.</h1>
      </header>

      <div className="mt-14 grid lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
          {menu.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-card overflow-hidden flex">
              <img src={m.image} alt={m.name} loading="lazy" className="w-32 h-full object-cover" />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-display text-lg leading-tight">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.description}</p>
                <div className="mt-auto pt-3 flex items-center justify-between">
                  <span className="text-gold font-semibold">{m.price} SAR</span>
                  {cart[m.id] ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => sub(m.id)} className="h-8 w-8 grid place-items-center rounded-full border border-border hover:border-gold hover:text-gold"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-6 text-center">{cart[m.id]}</span>
                      <button onClick={() => add(m.id)} className="h-8 w-8 grid place-items-center rounded-full bg-gradient-gold text-primary-foreground"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  ) : (
                    <Button onClick={() => add(m.id)} variant="outlineGold" size="sm"><Plus className="h-3.5 w-3.5" /> Add</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart */}
        <aside className="lg:sticky lg:top-28 self-start rounded-2xl border border-border bg-card/70 p-6">
          <h2 className="font-display text-2xl flex items-center gap-2"><ShoppingBag className="h-5 w-5 text-gold" /> Your Order</h2>

          {lines.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">Your cart is empty. Add a dish to begin.</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {lines.map((l) => (
                <li key={l.item.id} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex-1">
                    <div className="font-medium">{l.item.name}</div>
                    <div className="text-xs text-muted-foreground">{l.qty} × {l.item.price} SAR</div>
                  </div>
                  <span className="text-gold font-semibold">{l.qty * l.item.price}</span>
                  <button onClick={() => remove(l.item.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}

          <div className="gold-divider my-6" />

          <form onSubmit={placeOrder} className="space-y-4">
            <div>
              <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Method</Label>
              <RadioGroup value={mode} onValueChange={(v) => setMode(v as "delivery" | "pickup")} className="mt-3 grid grid-cols-2 gap-2">
                {(["delivery","pickup"] as const).map((m) => (
                  <Label key={m} className={`cursor-pointer rounded-lg border p-3 text-center capitalize text-sm ${mode === m ? "border-gold text-gold" : "border-border text-muted-foreground"}`}>
                    <RadioGroupItem value={m} className="sr-only" /> {m}
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Name</Label>
              <Input id="name" required className="mt-2" placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</Label>
              <Input id="phone" required type="tel" className="mt-2" placeholder="+966 ..." />
            </div>
            {mode === "delivery" && (
              <div>
                <Label htmlFor="addr" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Address</Label>
                <Input id="addr" required className="mt-2" placeholder="Street, district, city" />
              </div>
            )}

            <div className="space-y-1.5 pt-2 text-sm">
              <Row label="Subtotal" value={`${subtotal} SAR`} />
              <Row label={mode === "delivery" ? "Delivery" : "Pickup"} value={fee ? `${fee} SAR` : "Free"} />
              <div className="gold-divider my-2" />
              <Row label="Total" value={`${total} SAR`} bold />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full mt-2">Place Order</Button>
          </form>
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
