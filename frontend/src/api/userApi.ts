import type { User } from "../types/user";
import type { Shop } from "../types/shop";
import axiosClient from "./apiClient";

export const getUserInfoByUsername = async (
  username: string
): Promise<User> => {
  const response = await axiosClient.get("/users", {
    params: { username },
  });
  return response?.data;
};

export const getShopByUserId = async (): Promise<Shop> => {
  const response = await axiosClient.get("/users/shop");
  return response?.data;
};
