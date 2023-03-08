import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Types } from "mongoose";
import { JsonWebToken } from "@triki/common";

export const mockedUserId = new Types.ObjectId().toHexString();
jest.spyOn(JsonWebToken, "verify").mockReturnValue({
  id: mockedUserId,
  email: "test@test.com",
});

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

declare global {
  var cookie: () => string[];
}

global.cookie = () => {
  const mockedCookie = `token=token`;

  return [mockedCookie];
};
