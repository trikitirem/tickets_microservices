import express from "express";
import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from "./routes";
import { errorHandler } from "@triki/common";
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();
app.set("trust proxy", true);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(errorHandler);

export { app };
