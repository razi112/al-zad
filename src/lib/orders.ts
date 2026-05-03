import type { MenuItem, SizeVariant } from "@/data/menu";

export type OrderStatus = "new" | "preparing" | "ready" | "delivered" | "cancelled";

export type OrderLine = {
  itemId: string;
  itemName: string;
  sizeLabel?: string;
  sizePrice?: number;
  basePrice: number;
  qty: number;
};

export type Order = {
  id: string;
  placedAt: string; // ISO timestamp
  status: OrderStatus;
  mode: "delivery" | "pickup";
  name: string;
  phone: string;
  address?: string;
  lines: OrderLine[];
  subtotal: number;
  fee: number;
  total: number;
};

const STORAGE_KEY = "alzad_orders";
const EVENT_KEY = "alzad_orders_updated";

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  // Notify same-tab listeners
  window.dispatchEvent(new CustomEvent(EVENT_KEY));
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const orders = getOrders().map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  window.dispatchEvent(new CustomEvent(EVENT_KEY));
}

export function subscribeToOrders(cb: () => void): () => void {
  // Same-tab updates via custom event
  window.addEventListener(EVENT_KEY, cb);
  // Cross-tab updates via storage event
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT_KEY, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function generateOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}

export function buildOrderLines(
  cart: Record<string, number>,
  menuItems: MenuItem[]
): OrderLine[] {
  return Object.entries(cart).map(([key, qty]) => {
    const [id, sizeLabel] = key.split("::");
    const item = menuItems.find((m) => m.id === id)!;
    const size: SizeVariant | undefined = sizeLabel
      ? item.sizes?.find((s) => s.label === sizeLabel)
      : undefined;
    return {
      itemId: id,
      itemName: item.name,
      sizeLabel: size?.label,
      sizePrice: size?.price,
      basePrice: item.price,
      qty,
    };
  });
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "New",
  preparing: "Preparing",
  ready: "Ready",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  preparing: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  ready: "bg-green-500/15 text-green-400 border-green-500/30",
  delivered: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

export const STATUS_NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  new: "preparing",
  preparing: "ready",
  ready: "delivered",
};
