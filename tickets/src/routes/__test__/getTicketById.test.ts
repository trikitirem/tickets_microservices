import request from "supertest";
import { app } from "../../app";
import { Types } from "mongoose";

describe("get ticket by id", () => {
  it("returns a 404 if the ticket is not found", async () => {
    const id = new Types.ObjectId().toHexString();

    await request(app).get(`/tickets/${id}`).send().expect(404);
  });

  it("returns a 400 if the id is invalid", async () => {
    await request(app).get("/tickets/invalidid").send().expect(400);
  });

  it("returns a ticket if the ticket is found", async () => {
    const title = "Bad Omens";
    const price = 20;

    const createdTicket = await request(app)
      .post("/tickets")
      .set("Authorization", "Bearer token")
      .send({ title, price })
      .expect(201);

    const { id } = createdTicket.body;

    const { body, statusCode } = await request(app)
      .get(`/tickets/${id}`)
      .send();

    expect(statusCode).toEqual(200);
    expect(body.title).toEqual(title);
    expect(body.price).toEqual(price);
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
  });
});
