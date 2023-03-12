import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "@triki/common";
import { router } from "./routes";
import { currentUser } from "@triki/common";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(cookieParser());

app.use(currentUser);

app.use(router);

app.use(errorHandler);

export { app };
