import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import orderApi from "../../src/routes/orderApi";
import { HttpError } from "../../src/utils/HttpError";

export const makeTestApp = () => {
  const app = express();

  app.use(bodyParser.json());

  app.use("/orders", orderApi);

  app.use(
    (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
      if (err instanceof HttpError) {
        res.status(err.status).json({ error: err.message });
        return;
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  );

  return app;
};
