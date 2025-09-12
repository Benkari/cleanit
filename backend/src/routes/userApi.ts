import { Router, Request, Response } from "express";
import apiUtils from "../utils/apiUtils";
import { z } from "zod";
import { getUserByUsername } from "../repositories/userRepository";
import { authenticateUser } from "../middlewares/authenticate";
import { getShopByUserId } from "../repositories/shopRepository";
import { NotFoundError, ValidationError } from "../utils/HttpError";

const router = Router();

const querySchema = z.object({
  username: z.string().min(1, "Username is required"),
});

router.get(
  "/",
  apiUtils.catchAsync(async (req: Request, res: Response) => {
    const parseResult = querySchema.safeParse(req.query);

    if (!parseResult.success) throw new ValidationError("Wrong username");

    const { username } = parseResult.data;

    const user = await getUserByUsername(username);
    if (user) {
      return res.status(200).json(user);
    }

    throw new NotFoundError("User not found");
  })
);

router.get(
  "/shop",
  authenticateUser,
  apiUtils.catchAsync(async (req: Request, res: Response) => {
    const userId = req.userId;
    const shop = await getShopByUserId(userId);

    if (!shop) throw new NotFoundError("Shop not found");

    res.status(200).json(shop);
  })
);

export default router;
