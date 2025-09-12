import type { Shop } from "./shop";
import type { User } from "./user";

export const cities = [
  { value: "vienna", label: "Vienna" },
  { value: "graz", label: "Graz" },
  { value: "linz", label: "Linz" },
  { value: "salzburg", label: "Salzburg" },
  { value: "innsbruck", label: "Innsbruck" },
  { value: "klagenfurt", label: "Klagenfurt" },
  { value: "villach", label: "Villach" },
  { value: "wels", label: "Wels" },
  { value: "stpölten", label: "St. Pölten" },
] as const;

export type City = (typeof cities)[number]["value"];

export const ORDER_VARIANTS = {
  ECONOMY: "economy",
  EXPRESS: "express",
  VIP: "vip",
} as const;

export type OrderVariants =
  (typeof ORDER_VARIANTS)[keyof typeof ORDER_VARIANTS];

export const ORDER_STATUS = {
  DISPATCHED: "dispatched",
  IN_PROCESS: "in_process",
  READY: "ready",
  DELIVERED: "delivered",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface Order {
  id: string;
  created_at: string;
  pickup: boolean;
  quantity: number;
  price: number;
  variant: OrderVariants;
  status: OrderStatus;
  address?: string | null;
  comment?: string | null;
  customer: Pick<User, "id" | "username" | "email" | "name">;
  shop: Shop;
}

export type NewOrder = Pick<
  Order,
  "pickup" | "quantity" | "address" | "variant" | "comment"
> & {
  city: City;
};
