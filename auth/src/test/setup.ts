import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Types } from "mongoose";
import { JsonWebToken } from "@triki/common";

const id = new Types.ObjectId().toHexString();
jest
  .spyOn(JsonWebToken, "verify")
  .mockImplementation((_) => ({ id, email: "test@email.com" }));

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "randomstring";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});
