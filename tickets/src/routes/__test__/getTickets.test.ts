import request from "supertest";
import { app } from "../../app";

const createTicket = () =>
  request(app)
    .post("/")
    .set("Authorization", "Bearer token")
    .send({ title: "random title", price: 20 })
    .expect(201);

describe("get all tickets", () => {
  it("can fetch a list of tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const { body, statusCode } = await request(app).get("/all").send();

    expect(statusCode).toEqual(200);
    expect(body.tickets).toHaveLength(3);
  });
});
