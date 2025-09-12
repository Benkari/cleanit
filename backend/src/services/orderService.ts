import orderRepository from "../repositories/orderRepository";
import { NewOrder, Order, ORDER_STATUS } from "../types/order";
import { User } from "../types/user";
import { NotFoundError } from "../utils/HttpError";
import shopPolicy from "./policy/shopPolicy";
import shopService from "./shopService";

const calculateOrderPrice = async (newOrder: NewOrder): Promise<number> => {
  const basePrices = {
    economy: 20,
    express: 30,
    vip: 40,
  } as const;

  const base = basePrices[newOrder.variant];
  const priceWithoutPickup = base * newOrder.quantity;
  const price = newOrder.pickup ? priceWithoutPickup + 10 : priceWithoutPickup;

  return price;
};

export const getOrdersByShopId = async (
  shopId: number,
  userId: User["id"]
): Promise<Order[]> => {
  await shopPolicy.ensureMangerHasAccessToShop(shopId, userId);

  return await orderRepository.getOrdersByShopId(shopId, userId);
};

export const addNewOrder = async (
  userId: User["id"],
  newOrder: NewOrder
): Promise<Partial<Order>> => {
  const availableShop = await shopService.getAvailableShopByCity(newOrder.city);

  if (!availableShop) throw new NotFoundError("No shop available");

  const price = await calculateOrderPrice(newOrder);

  const status = ORDER_STATUS.DISPATCHED;

  const createdOrder = await orderRepository.addNewOrder(
    userId,
    newOrder,
    availableShop,
    price,
    status
  );

  return { ...createdOrder, shop: availableShop };
};

export default { addNewOrder, getOrdersByShopId };
