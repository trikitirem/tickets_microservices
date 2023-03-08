import request from "supertest";
import { app } from "../../app";
import { Routes } from "../utils";

describe("signout route", () => {
  it("clears the cookie after signing out", async () => {
    await request(app)
      .post(Routes.SignUp)
      .set("Content-Type", "application/json")
      .send({ email: "jan@wp.pl", password: "Kwakwa5!" })
      .expect(201);

    const response = await request(app)
      .post(Routes.SignOut)
      .send({})
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
