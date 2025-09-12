import shopRepository from "../../repositories/shopRepository";
import { Shop } from "../../types/shop";
import { User } from "../../types/user";
import { ForbiddenError } from "../../utils/HttpError";

export const ensureMangerHasAccessToShop = async (
  shopId: Shop["id"],
  managerId: User["id"]
): Promise<void> => {
  const shopUserRelationship = await shopRepository.getShopUserRelationId(
    shopId,
    managerId
  );

  if (!shopUserRelationship) throw new ForbiddenError("Request not authorized");
};

export default {
  ensureMangerHasAccessToShop,
};
