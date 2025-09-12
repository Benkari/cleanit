import { Request, Response, Router } from "express";
import apiUtils from "../utils/apiUtils";
import orderService from "../services/orderService";
import z from "zod";
import { authenticateUser } from "../middlewares/authenticate";
import { ORDER_VARIANTS } from "../types/order";
import { cities } from "../types/city";
import { ValidationError } from "../utils/HttpError";

const router = Router();

router.post(
  "/",
  authenticateUser,
  apiUtils.catchAsync(async (req: Request, res: Response) => {
    const newOrderSchema = z.object({
      pickup: z.boolean().default(false),
      quantity: z.number().int().positive().default(1),
      city: z.enum(cities.map((c) => c.value)).nonoptional(),
      address: z.string().optional(),
      variant: z.enum(ORDER_VARIANTS).nonoptional(),
      comment: z.string().optional(),
    });

    const result = newOrderSchema.safeParse(req.body);

    if (!result.success) throw new ValidationError("Bad values in body");

    const parsedBody = result.data;

    const userId = req.userId;

    const response = await orderService.addNewOrder(userId, parsedBody);

    res.status(201).json(response);
  })
);

router.get(
  "/:shopId",
  authenticateUser,
  apiUtils.catchAsync(async (req: Request, res: Response) => {
    const ParamsSchema = z.object({
      shopId: z.coerce.number().int().positive(),
    });
    const params = ParamsSchema.safeParse(req.params);

    if (!params.success) throw new ValidationError("invalid shopId");

    const { shopId } = params.data;
    const userId = req.userId;

    const response = await orderService.getOrdersByShopId(shopId, userId);
    res.status(200).json(response);
  })
);

export default router;
