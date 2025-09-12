import type { NewOrder } from "../types/order";

export const getEstimatedPrice = async (
  newOrder: NewOrder
): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const basePrices = {
        economy: 20,
        express: 30,
        vip: 40,
      } as const;

      const base = basePrices[newOrder.variant];
      const priceWithoutPickup = base * newOrder.quantity;
      const price = newOrder.pickup
        ? priceWithoutPickup + 10
        : priceWithoutPickup;

      resolve(price);
    }, 1000);
  });
};
