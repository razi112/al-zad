import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  subscribeToOrders,
  type Order,
  type OrderStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  STATUS_NEXT,
} from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Phone,
  MapPin,
  Clock,
  User,
  ChevronRight,
  LogOut,
  RefreshCw,
  Package,
  CheckCircle2,
  XCircle,
  Bike,
  ChefHat,
  Trash2,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — AL ZAD" }],
  }),
  component: AdminPage,
});

const ADMIN_PIN = "2026"; // change this to your preferred PIN

// ── Status icon map ──────────────────────────────────────────────────────────
const StatusIcon: Record<OrderStatus, React.ElementType> = {
  new: ShoppingBag,
  preparing: ChefHat,
  ready: Package,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

// ── Notification sound (Web Audio API — no file needed) ─────────────────────
function playNewOrderSound() {
  try {
    const ctx = new AudioContext();

    const play = (freq: number, startTime: number, duration: number, gain: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const t = ctx.currentTime;
    // Three ascending tones — pleasant "ding ding ding"
    play(880, t,        0.18, 0.4);
    play(1100, t + 0.2, 0.18, 0.4);
    play(1320, t + 0.4, 0.28, 0.5);

    // Clean up context after sound finishes
    setTimeout(() => ctx.close(), 1200);
  } catch {
    // AudioContext not available (e.g. SSR or blocked) — fail silently
  }
}


function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── PIN gate ─────────────────────────────────────────────────────────────────
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      onUnlock();
    } else {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-gold/10 border border-gold/30 grid place-items-center mx-auto">
            <ChefHat className="h-8 w-8 text-gold" />
          </div>
          <h1 className="mt-4 font-display text-3xl">Admin Access</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your PIN to continue</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <Input
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            className={`text-center text-2xl tracking-[0.5em] h-14 ${error ? "border-destructive" : ""}`}
            autoFocus
          />
          {error && (
            <p className="text-center text-sm text-destructive">Incorrect PIN</p>
          )}
          <Button type="submit" variant="gold" size="lg" className="w-full">
            Unlock Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── Order card ───────────────────────────────────────────────────────────────
function OrderCard({ order, onStatusChange }: { order: Order; onStatusChange: () => void }) {
  const Icon = StatusIcon[order.status];
  const nextStatus = STATUS_NEXT[order.status];

  const advance = () => {
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
      onStatusChange();
    }
  };

  const cancel = () => {
    updateOrderStatus(order.id, "cancelled");
    onStatusChange();
  };

  const remove = () => {
    if (window.confirm(`Delete order ${order.id}? This cannot be undone.`)) {
      deleteOrder(order.id);
      onStatusChange();
    }
  };

  const linePrice = (l: (typeof order.lines)[0]) =>
    (l.sizePrice ?? l.basePrice) * l.qty;

  return (
    <article className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gold/10 border border-gold/30 grid place-items-center">
            <Icon className="h-4 w-4 text-gold" />
          </div>
          <div>
            <div className="font-semibold text-sm">{order.id}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(order.placedAt)} · {timeAgo(order.placedAt)}
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-semibold border ${STATUS_COLORS[order.status]}`}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      {/* Customer info */}
      <div className="px-5 py-4 grid gap-2 border-b border-border/60">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-gold shrink-0" />
          <span className="font-medium">{order.name}</span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full border border-border capitalize text-muted-foreground">
            {order.mode === "delivery" ? (
              <span className="flex items-center gap-1"><Bike className="h-3 w-3" /> Delivery</span>
            ) : (
              <span className="flex items-center gap-1"><Package className="h-3 w-3" /> Pickup</span>
            )}
          </span>
        </div>
        <a
          href={`tel:${order.phone}`}
          className="flex items-center gap-2 text-sm text-gold hover:underline"
        >
          <Phone className="h-4 w-4 shrink-0" />
          {order.phone}
        </a>
        {order.address && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
            {order.address}
          </div>
        )}
      </div>

      {/* Order lines */}
      <div className="px-5 py-4 space-y-2 border-b border-border/60">
        {order.lines.map((l, i) => (
          <div key={i} className="flex items-baseline justify-between gap-3 text-sm">
            <div className="flex-1">
              <span className="font-medium">{l.itemName}</span>
              {l.sizeLabel && (
                <span className="ml-1.5 text-xs text-muted-foreground">({l.sizeLabel})</span>
              )}
              <span className="text-xs text-muted-foreground ml-1.5">× {l.qty}</span>
            </div>
            <span className="text-gold font-semibold whitespace-nowrap">₹{linePrice(l)}</span>
          </div>
        ))}
      </div>

      {/* Totals + actions */}
      <div className="px-5 py-4 flex items-center justify-between gap-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Total </span>
          <span className="text-gold font-bold text-base">₹{order.total}</span>
          {order.fee > 0 && (
            <span className="text-xs text-muted-foreground ml-1">(incl. ₹{order.fee} delivery)</span>
          )}
        </div>
        <div className="flex gap-2">
          {order.status !== "delivered" && order.status !== "cancelled" && (
            <button
              onClick={cancel}
              className="h-8 w-8 grid place-items-center rounded-lg border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
              title="Cancel order"
            >
              <XCircle className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={remove}
            className="h-8 w-8 grid place-items-center rounded-lg border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
            title="Delete order"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {nextStatus && (
            <Button onClick={advance} variant="gold" size="sm" className="gap-1.5">
              Mark {STATUS_LABELS[nextStatus]}
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar({ orders }: { orders: Order[] }) {
  const counts = orders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<OrderStatus, number>
  );

  const todayRevenue = orders
    .filter(
      (o) =>
        o.status !== "cancelled" &&
        new Date(o.placedAt).toDateString() === new Date().toDateString()
    )
    .reduce((s, o) => s + o.total, 0);

  const stats = [
    { label: "New", value: counts.new ?? 0, color: "text-blue-400" },
    { label: "Preparing", value: counts.preparing ?? 0, color: "text-amber-400" },
    { label: "Ready", value: counts.ready ?? 0, color: "text-green-400" },
    { label: "Delivered", value: counts.delivered ?? 0, color: "text-muted-foreground" },
    { label: "Today's Revenue", value: `₹${todayRevenue}`, color: "text-gold" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border bg-card/60 px-4 py-3 text-center"
        >
          <div className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</div>
          <div className="text-xs text-muted-foreground mt-0.5 uppercase tracking-[0.15em]">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main dashboard ───────────────────────────────────────────────────────────
const STATUS_FILTERS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Preparing", value: "preparing" },
  { label: "Ready", value: "ready" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

function AdminPage() {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem("alzad_admin") === "1";
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [tick, setTick] = useState(0); // forces timeAgo re-render

  // Track new-order count to detect incoming orders
  const prevNewCount = useRef<number | null>(null);

  const reload = useCallback(() => {
    setOrders(getOrders());
  }, []);

  // Play sound when a new "new" order arrives
  useEffect(() => {
    const newCount = orders.filter((o) => o.status === "new").length;
    if (prevNewCount.current !== null && newCount > prevNewCount.current) {
      playNewOrderSound();
    }
    prevNewCount.current = newCount;
  }, [orders]);

  useEffect(() => {
    if (!unlocked) return;
    reload();
    const unsub = subscribeToOrders(reload);
    // Refresh timeAgo labels every 30s
    const interval = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [unlocked, reload]);

  const unlock = () => {
    sessionStorage.setItem("alzad_admin", "1");
    setUnlocked(true);
  };

  const logout = () => {
    sessionStorage.removeItem("alzad_admin");
    setUnlocked(false);
  };

  if (!unlocked) return <PinGate onUnlock={unlock} />;

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const activeCount = orders.filter(
    (o) => o.status === "new" || o.status === "preparing"
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-10 py-8 lg:py-12">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl lg:text-4xl">
            Kitchen Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {activeCount > 0
              ? `${activeCount} active order${activeCount > 1 ? "s" : ""} in progress`
              : "No active orders right now"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reload}
            className="h-9 w-9 grid place-items-center rounded-lg border border-border text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={logout}
            className="h-9 w-9 grid place-items-center rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <StatsBar orders={orders} />

      {/* Filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => {
          const count =
            f.value === "all"
              ? orders.length
              : orders.filter((o) => o.status === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] border transition-all ${
                filter === f.value
                  ? "bg-gradient-gold text-primary-foreground border-transparent shadow-gold"
                  : "border-border text-muted-foreground hover:text-gold hover:border-gold/50"
              }`}
            >
              {f.label}
              {count > 0 && (
                <span className="ml-1.5 opacity-70">({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Orders grid */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-sm">No orders here yet.</p>
          </div>
        ) : (
          <div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            // suppress unused tick warning — it's used to force re-render for timeAgo
            data-tick={tick}
          >
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} onStatusChange={reload} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
