import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "@triki/common";
import { getOrdersRouter, createOrderRouter } from "./routes";
import { currentUser } from "@triki/common";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(cookieParser());

app.use(currentUser);

app.use(getOrdersRouter);
app.use(createOrderRouter);

app.use(errorHandler);

export { app };
