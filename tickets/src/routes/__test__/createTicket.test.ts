import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models";

describe("new ticket route", () => {
  it("can only be accesed when user is signed in", async () => {
    const { statusCode } = await request(app).post("/tickets").send({});

    expect(statusCode).toEqual(401);
  });

  it("returns a status code other than 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/tickets")
      .set("Authorization", "Bearer token")
      .send({});

    expect(response.statusCode).not.toEqual(401);
  });

  it("returns error when invalid title is provided", async () => {
    await request(app)
      .post("/tickets")
      .set("Authorization", "Bearer token")
      .send({ title: "", price: 10 })
      .expect(400);

    await request(app)
      .post("/tickets")
      .set("Authorization", "Bearer token")
      .send({ price: 10 })
      .expect(400);
  });

  it("returns error when invalid price is provided", async () => {
    await request(app)
      .post("/tickets")
      .set("Authorization", "Bearer token")
      .send({ title: "random title", price: -10 })
      .expect(400);

    await request(app)
      .post("/tickets")
      .set("Authorization", "Bearer token")
      .send({ title: "random title", price: 0 })
      .expect(400);
  });

  it("creates a ticket with valid inputs", async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app)
      .post("/tickets")
      .set("Authorization", "Bearer token")
      .send({ title: "random title", price: 10 })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
  });
});
