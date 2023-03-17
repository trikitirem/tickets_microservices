import mongoose from "mongoose";
import { app } from "./app";
import { EventBus, connectToService } from "@triki/common";
import { onMessage } from "./events";
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
    await connectToService(async () => {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log("Connected to DB");
    });

    const eventBus = EventBus.getInstance();
    await connectToService(async () => {
      await eventBus.connect(onMessage);
      console.log("Connected to RabbitMQ");
    });

    app.listen(4000, () => {
      console.log("Listening on port 4000");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
