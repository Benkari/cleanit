import shopRepository from "../repositories/shopRepository";
import { City } from "../types/city";
import { Shop } from "../types/shop";

export const getAvailableShopByCity = async (
  city: City
): Promise<Shop | null> => {
  // This could also be some sort of algorithm base on users location
  // or shops availability
  return await shopRepository.getOneShopByCity(city);
};

export default { getAvailableShopByCity };
