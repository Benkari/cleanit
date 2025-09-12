import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
import helmet from "helmet";
import userApi from "./routes/userApi";
import orderApi from "./routes/orderApi";
import { HttpError } from "./utils/HttpError";

const app = express();

app.use(helmet());

app.use(express.json());

// For dev
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//   })
// );

app.use("/api/users", userApi);
app.use("/api/orders", orderApi);

app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof HttpError) {
      res.status(err.status).json({ error: err.message });
      return;
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
);

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`API listening on ${port}`));
