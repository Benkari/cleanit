import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.header("X-User-Id");

  if (!userId) {
    return res.status(401).json({ message: "Missing userId" });
  }

  req.userId = userId;

  next();
};
