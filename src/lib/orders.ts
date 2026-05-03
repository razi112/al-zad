import { supabase } from "./supabase";
import type { MenuItem, SizeVariant } from "@/data/menu";
import type { RealtimeChannel } from "@supabase/supabase-js";

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
  placed_at: string; // ISO timestamp — matches Supabase column name
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

// ── CRUD ─────────────────────────────────────────────────────────────────────

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("placed_at", { ascending: false });

  if (error) {
    console.error("getOrders error:", error.message);
    return [];
  }
  return (data ?? []) as Order[];
}

export async function saveOrder(order: Order): Promise<void> {
  const { error } = await supabase.from("orders").insert([order]);
  if (error) console.error("saveOrder error:", error.message);
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) console.error("updateOrderStatus error:", error.message);
}

export async function deleteOrder(id: string): Promise<void> {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) console.error("deleteOrder error:", error.message);
}

// ── Realtime subscription ─────────────────────────────────────────────────────
// Returns an unsubscribe function. Calls `cb` on any INSERT / UPDATE / DELETE.

export function subscribeToOrders(cb: () => void): () => void {
  const channel: RealtimeChannel = supabase
    .channel("orders-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "orders" },
      (payload) => {
        console.log("[Realtime] orders change:", payload.eventType, payload);
        cb();
      }
    )
    .subscribe((status, err) => {
      if (err) console.error("[Realtime] subscription error:", err);
      else console.log("[Realtime] subscription status:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

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
