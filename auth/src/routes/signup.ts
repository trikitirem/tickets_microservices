import { Router } from "express";
import { Routes, Auth } from "./utils";
import { User } from "../models";
import * as jwt from "@triki/common";

const router = Router();

router.post(Routes.SignUp, async (req, res, next) => {
  try {
    const body = Auth.parse(req.body);

    const user = new User(body);
    await user.save();

    const token = jwt.sign({
      id: user.id,
      email: user.email,
    });

    res.cookie("auth", token, { domain: "*" }).status(201).send(user);
  } catch (err) {
    next(err);
  }
});

export { router as signUpRouter };
