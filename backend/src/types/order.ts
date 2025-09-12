import { City } from "./city";
import { Shop } from "./shop";
import { User } from "./user";

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
