jest.mock("../../src/repositories/orderRepository");
jest.mock("../../src/services/shopService");
jest.mock("../../src/services/policy/shopPolicy");

import {
  NewOrder,
  ORDER_STATUS,
  OrderStatus,
  OrderVariants,
} from "../../src/types/order";

import orderRepository from "../../src/repositories/orderRepository";
import shopService from "../../src/services/shopService";
import orderService from "../../src/services/orderService";

import shopPolicy from "../../src/services/policy/shopPolicy";
import { ForbiddenError } from "../../src/utils/HttpError";

const mockedOrderRepo = orderRepository as jest.Mocked<typeof orderRepository>;
const mockedShopService = shopService as jest.Mocked<typeof shopService>;
const mockedShopPolicy = shopPolicy as jest.Mocked<typeof shopPolicy>;

describe("Order service tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("Creates new order", () => {
    const shop = {
      id: 1,
      name: "some shop",
      address: "some address",
    };

    it("finds the next available shop", async () => {
      mockedShopService.getAvailableShopByCity.mockResolvedValue(shop);
      mockedOrderRepo.addNewOrder.mockResolvedValue({});

      const userId = "1";
      const newOrder: NewOrder = {
        pickup: true,
        quantity: 2,
        address: "",
        city: "vienna",
        variant: "economy",
        comment: "",
      };

      const response = await orderService.addNewOrder(userId, newOrder);

      expect(response.shop).toEqual(shop);
      expect(mockedOrderRepo.addNewOrder).toHaveBeenCalled();
    });

    it("doesn't finds the next available shop", async () => {
      mockedOrderRepo.addNewOrder.mockResolvedValue({});
      mockedShopService.getAvailableShopByCity.mockResolvedValue(null);

      const userId = "1";
      const newOrder: NewOrder = {
        pickup: true,
        quantity: 2,
        address: "",
        city: "Berlin" as any, // It must be wrong
        variant: "economy",
        comment: "",
      };

      await expect(orderService.addNewOrder(userId, newOrder)).rejects.toThrow(
        new Error("No shop available")
      );
      expect(mockedOrderRepo.addNewOrder).not.toHaveBeenCalled();
    });

    it("calculates the price and selects the initial order status", async () => {
      mockedShopService.getAvailableShopByCity.mockResolvedValue(shop);
      mockedOrderRepo.addNewOrder.mockResolvedValue({});

      const userId = "1";
      const newOrder: NewOrder = {
        pickup: true,
        quantity: 2,
        address: "",
        city: "vienna",
        variant: "economy",
        comment: "",
      };

      await orderService.addNewOrder(userId, newOrder);
      expect(mockedOrderRepo.addNewOrder).toHaveBeenCalledWith(
        userId,
        newOrder,
        shop,
        expect.any(Number),
        ORDER_STATUS.DISPATCHED
      );
    });
  });

  describe("Get shop orders", () => {
    const exampleResponse = [
      {
        id: "e3911057-7144-46ef-ab18-e5cb2730df3a",
        status: "dispatched" as OrderStatus,
        created_at: "2025-09-09T19:57:48.882Z",
        pickup: false,
        quantity: 1,
        variant: "economy" as OrderVariants,
        comment: "",
        address: "",
        price: 20,
        customer: {
          id: "edd03cc0-85c1-4827-a0e9-30de1ada1add",
          username: "customer1",
          email: "customer1@example.com",
          name: "Chris Customer",
        },
        shop: {
          id: 1,
          name: "Vienna Central Shop",
          address: "Main Street 1, Vienna",
        },
      },
    ];

    it("returns the shop orders for manager", async () => {
      mockedShopPolicy.ensureMangerHasAccessToShop.mockResolvedValue(undefined);
      mockedOrderRepo.getOrdersByShopId.mockResolvedValue(exampleResponse);

      const shopId = 1;
      const managerId = "1";

      const response = await orderService.getOrdersByShopId(shopId, managerId);
      expect(response).toEqual(exampleResponse);
    });

    it("throws forbiden error due to unauthorzed manager", async () => {
      mockedShopPolicy.ensureMangerHasAccessToShop.mockRejectedValue(
        new ForbiddenError("Not authorized")
      );

      const shopId = 1;
      const managerId = "1";

      await expect(
        orderService.getOrdersByShopId(shopId, managerId)
      ).rejects.toThrow(new ForbiddenError("Not authorized"));
      expect(mockedOrderRepo.getOrdersByShopId).not.toHaveBeenCalled();
    });
  });
});
