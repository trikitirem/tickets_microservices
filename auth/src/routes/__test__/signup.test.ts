import request from "supertest";
import { app } from "../../app";
import { Routes } from "../utils";

describe("signup route", () => {
  it("returns a 201 on successful signup", async () => {
    const response = await request(app)
      .post(Routes.SignUp)
      .set("Content-Type", "application/json")
      .send({ email: "jan@wp.pl", password: "Kwakwa5!" });

    expect(response.statusCode).toBe(201);
  });

  it("returns 400 with an invalid email", async () => {
    const response = await request(app)
      .post(Routes.SignUp)
      .set("Content-Type", "application/json")
      .send({ password: "Kwakwa5!" });

    expect(response.statusCode).toBe(400);
  });

  it("returns 400 with an invalid password", async () => {
    const response = await request(app)
      .post(Routes.SignUp)
      .set("Content-Type", "application/json")
      .send({ email: "jan@wp.pl" });

    expect(response.statusCode).toBe(400);
  });

  it("disallows duplicate emails", async () => {
    // register firt user
    await request(app)
      .post(Routes.SignUp)
      .set("Content-Type", "application/json")
      .send({ email: "jan@wp.pl", password: "Kwakwa5!" })
      .expect(201);

    // try to register second user, but with the same email
    const response = await request(app)
      .post(Routes.SignUp)
      .set("Content-Type", "application/json")
      .send({ email: "jan@wp.pl", password: "Kwakwa5!" });

    expect(response.statusCode).toBe(500);
  });

  it("sets a cookie after successful signup", async () => {
    const response = await request(app)
      .post(Routes.SignUp)
      .set("Content-Type", "application/json")
      .send({ email: "jan@wp.pl", password: "Kwakwa5!" });

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
