import mongoose from "mongoose";
import { app } from "./app";
import { EventBus } from "@triki/common";
import dotenv from "dotenv";
import { onMessage } from "./events";

dotenv.config();

const start = async () => {
  try {
    if (!process.env.EVENT_BUS_URI) {
      throw new Error("EVENT_BUS_URI must be defined");
    }

    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined");
    }

    const eventbus = EventBus.getInstance();
    await eventbus.connect(onMessage);

    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
