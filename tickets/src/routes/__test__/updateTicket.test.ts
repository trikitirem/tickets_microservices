import request from "supertest";
import { app } from "../../app";
import { Types } from "mongoose";
import { JsonWebToken } from "@triki/common";

const ticket = { title: "Bad Omens", price: 20 };

describe("update ticket", () => {
  it("returns 404 when provided id does not exist", async () => {
    const id = new Types.ObjectId().toHexString();

    const { body, statusCode } = await request(app)
      .put(`/${id}`)
      .set("Authorization", "Bearer token")
      .send(ticket);

    expect(statusCode).toEqual(404);
    expect(body).toEqual({ errors: [{ message: "NOT_FOUND" }] });
  });

  it("returns 401 when user is unauthenticated", async () => {
    const id = new Types.ObjectId().toHexString();

    const { body, statusCode } = await request(app).put(`/${id}`).send(ticket);

    expect(statusCode).toEqual(401);
    expect(body).toEqual({ errors: [{ message: "UNAUTHORIZED" }] });
  });

  it("returns 403 when user is not owner of the ticket", async () => {
    const createdTicket = await request(app)
      .post("/")
      .set("Authorization", "Bearer token")
      .send(ticket)
      .expect(201);

    const id = new Types.ObjectId().toHexString();
    jest.spyOn(JsonWebToken, "verify").mockReturnValueOnce({
      id,
      email: "test2@test.com",
    });

    const { body, statusCode } = await request(app)
      .put(`/${createdTicket.body.id}`)
      .send(ticket)
      .set("Authorization", "Bearer token");

    expect(statusCode).toEqual(403);
    expect(body).toEqual({ errors: [{ message: "FORBIDDEN" }] });
  });

  it("returns 400 when title or price are wrong", async () => {
    const createdTicket = await request(app)
      .post("/")
      .set("Authorization", "Bearer token")
      .send(ticket)
      .expect(201);

    const { statusCode, body } = await request(app)
      .put(`/${createdTicket.body.id}`)
      .send({ title: "", price: -1 })
      .set("Authorization", "Bearer token");

    expect(statusCode).toEqual(400);
    expect(body).toEqual({
      errors: [
        { message: "TITLE_INVALID", field: "title" },
        { message: "PRICE_INVALID", field: "price" },
      ],
      type: "VALIDATION_ERROR",
    });
  });

  it("allows to update the ticket", async () => {
    const createdTicket = await request(app)
      .post("/")
      .set("Authorization", "Bearer token")
      .send(ticket)
      .expect(201);

    const { body, statusCode } = await request(app)
      .put(`/${createdTicket.body.id}`)
      .send({ title: "Bring Me The Horizon", price: 22 })
      .set("Authorization", "Bearer token");

    expect(statusCode).toEqual(200);
    expect(body).toEqual({ ok: true });
  });
});
