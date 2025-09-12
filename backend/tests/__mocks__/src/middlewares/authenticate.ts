import { NextFunction, Request, Response } from "express";

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  req.userId = "42";
  next();
};
