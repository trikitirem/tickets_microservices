import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "@triki/common";
import { router } from "./routes";
import { currentUser } from "@triki/common";
import cors from "cors";

const app = express();
app.set("trust proxy", true);
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Authorization", "Content-Type", "Origin"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(currentUser);

app.use(router);

app.use(errorHandler);

export { app };
