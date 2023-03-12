import request from "supertest";
import { app } from "../../app";
import { Routes } from "../utils";
import { Types } from "mongoose";
import { Ticket } from "../../models/Ticket";

const ticketId = new Types.ObjectId();
const ticketPrice = 20;

const createTicket = async () => {
  const ticket = new Ticket({ id: ticketId, price: ticketPrice });
  await ticket.save();
};

const createOrder = async () => {
  const amount = 2;

  await request(app)
    .post(Routes.INDEX)
    .set("Authorization", "Bearer token")
    .send({ ticketId, amount })
    .expect(201);
};

describe("get orders", () => {
  it("should throw 401 when user is not authenticated", async () => {
    const response = await request(app).get(Routes.INDEX).send();

    expect(response.statusCode).toEqual(401);
  });

  it("should return list of orders that user created", async () => {
    await createTicket();

    await createOrder();
    await createOrder();

    const response = await request(app)
      .get(Routes.INDEX)
      .set("Authorization", "Bearer token")
      .send();

    const { statusCode, body } = response;
    expect(statusCode).toEqual(200);
    expect(body.orders).toHaveLength(2);
  });
});
