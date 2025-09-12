import type { NewOrder, Order } from "../types/order";
import axiosClient from "./apiClient";

export const addNewOrder = async (
  newOrder: NewOrder
): Promise<Partial<Order>> => {
  const response = await axiosClient.post("/orders", newOrder);
  return response?.data;
};

export const getOrdersByShopId = async (shopId: number): Promise<Order[]> => {
  const response = await axiosClient.get(`/orders/${shopId}`);
  return response?.data;
};
