import express from "express";
import { router } from "./routes";
import { currentUser, errorHandler } from "@triki/common";
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();
app.set("trust proxy", true);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use(currentUser);

app.use(router);

app.use(errorHandler);

export { app };
