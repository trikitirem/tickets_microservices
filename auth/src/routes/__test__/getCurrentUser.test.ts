import request from "supertest";
import { app } from "../../app";
import { Routes } from "../utils";
import { Types } from "mongoose";

describe("current-user route", () => {
  //TODO: repair this test
  it("responds with details about the current user", async () => {
    const id = new Types.ObjectId();
    const user = {
      id,
      email: "test@email.com",
    };

    jest.mock("@triki/common", () => ({
      ...jest.requireActual("@triki/common"),
      verify: jest.fn().mockReturnValue(user),
    }));

    await request(app)
      .get(Routes.CurrentUser)
      .set("Authorization", "Bearer token")
      .send()
      .expect(200);
  });

  it("responds with error if not authenticated", async () => {
    await request(app).get(Routes.CurrentUser).send().expect(401);
  });
});
