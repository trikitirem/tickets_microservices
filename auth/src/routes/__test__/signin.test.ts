import request from "supertest";
import { app } from "../../app";
import { Routes } from "../utils";
import { ErrorMessages } from "../utils";

describe("signin route", () => {
  it("returns 404 when requested user does not exist", async () => {
    const response = await request(app)
      .post(Routes.SignIn)
      .set("Content-Type", "application/json")
      .send({ email: "test@test.com", password: "Kwakwa5!" });

    const { statusCode, body } = response;

    expect(statusCode).toEqual(404);
    expect(body).toEqual({
      errors: [{ message: ErrorMessages.USER_NOT_FOUND }],
    });
  });

  it("returns 400 when password is wrong", async () => {
    await request(app)
      .post(Routes.SignUp)
      .set("Content-Type", "application/json")
      .send({ email: "test@test.com", password: "Kwakwa5!" })
      .expect(201);

    const response = await request(app)
      .post(Routes.SignIn)
      .set("Content-Type", "application/json")
      .send({ email: "test@test.com", password: "Kwakwa5?" });

    const { statusCode, body } = response;

    expect(statusCode).toEqual(400);
    expect(body).toEqual({
      errors: [{ message: ErrorMessages.PASSWORD_INVALID }],
    });
  });

  it("returns 400 with an invalid email", async () => {
    const response = await request(app)
      .post(Routes.SignIn)
      .set("Content-Type", "application/json")
      .send({ password: "Kwakwa5!" });

    const { statusCode, body } = response;

    expect(statusCode).toBe(400);
  });

  it("returns 400 with an invalid password", async () => {
    const response = await request(app)
      .post(Routes.SignIn)
      .set("Content-Type", "application/json")
      .send({ email: "jan@wp.pl" });

    expect(response.statusCode).toBe(400);
  });
});
