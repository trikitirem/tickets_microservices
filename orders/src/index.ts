import mongoose from "mongoose";
import { app } from "./app";
import { EventBus } from "@triki/common";
import { onMessage } from "./events";
import { TestEvent } from "./events/event";
import dotenv from "dotenv";

dotenv.config();

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be defined");
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be defined");
    }

    if (!process.env.EVENT_BUS_URI) {
      throw new Error("EVENT_BUS_URI must be defined");
    }

    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);

    const eventBus = EventBus.getInstance();
    await eventBus.connect(onMessage);

    eventBus.sendEvent(new TestEvent({ message: "eoeoeoeeo" }));

    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
