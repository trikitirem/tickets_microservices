import request from "supertest";
import { app } from "../../app";
import { Routes } from "../utils";
import { Types } from "mongoose";

const createOrder = async () => {
  const ticketId = new Types.ObjectId();
  const amount = 2;

  await request(app)
    .post(Routes.INDEX)
    .set("Cookie", cookie())
    .send({ ticketId, amount })
    .expect(201);
};

describe("get orders", () => {
  it("should throw 401 when user is not authenticated", async () => {
    const response = await request(app).get(Routes.INDEX).send();

    expect(response.statusCode).toEqual(401);
  });

  it("should return list of orders that user created", async () => {
    await createOrder();
    await createOrder();

    const response = await request(app)
      .get(Routes.INDEX)
      .set("Cookie", cookie())
      .send();

    const { statusCode, body } = response;
    expect(statusCode).toEqual(200);
    expect(body.orders).toHaveLength(2);
  });
});
