jest.mock("../../src/middlewares/authenticate", () =>
  require("../__mocks__/src/middlewares/authenticate")
);
jest.mock("../../src/services/orderService");

import request from "supertest";
import { makeTestApp } from "./testApp";
import orderService from "../../src/services/orderService";
import { OrderStatus, OrderVariants } from "../../src/types/order";

const mockedOrderService = orderService as jest.Mocked<typeof orderService>;

describe("Order Router (integration)", () => {
  const app = makeTestApp();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /orders", () => {
    const correctBody = {
      pickup: true,
      quantity: 4,
      city: "vienna",
      address: "",
      variant: "express",
      comment: "",
    } as const;

    it("creates a new order with defaults and returns 201", async () => {
      mockedOrderService.addNewOrder.mockResolvedValue(correctBody);

      const res = await request(app).post("/orders").send(correctBody);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(correctBody);

      expect(orderService.addNewOrder).toHaveBeenCalledWith(
        "42",
        expect.objectContaining(correctBody)
      );
    });

    it("fails to create a new order and returns 400", async () => {
      const body = {
        pickup: "Maybe",
        quantity: 4,
        city: "vienna",
        address: "",
        variant: "express",
        comment: "",
      };

      const res = await request(app).post("/orders").send(body);

      expect(res.status).toBe(400);

      expect(orderService.addNewOrder).not.toHaveBeenCalled();
    });
  });

  describe("GET /orders/:shopId", () => {
    it("returns orders for a valid shopId", async () => {
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
      mockedOrderService.getOrdersByShopId.mockResolvedValue(exampleResponse);

      const res = await request(app).get("/orders/1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(exampleResponse);

      expect(orderService.getOrdersByShopId).toHaveBeenCalledWith(1, "42");
    });

    it("returns 400 for invalid shopId", async () => {
      const res = await request(app).get("/orders/some-string-but-not-number");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "invalid shopId" });

      expect(orderService.getOrdersByShopId).not.toHaveBeenCalled();
    });
  });
});
