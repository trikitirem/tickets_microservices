import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
import { connectToService } from "@triki/common";

dotenv.config();

const start = async () => {
  if (!process.env.EVENT_BUS_URI) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  mongoose.set("strictQuery", true);

  await connectToService(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to DB");
  });

  const port = 4000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start();
