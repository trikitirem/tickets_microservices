import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

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

  let retries = 5;
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);

      // wait 5 seconds before another connection attempt
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  const port = 4000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start();
