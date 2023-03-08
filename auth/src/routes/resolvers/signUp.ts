import { Request, Response, NextFunction } from "express";
import { Auth } from "../utils";
import { JsonWebToken } from "@triki/common";
import { User } from "../../models";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = Auth.parse(req.body);

    const user = new User(body);
    await user.save();

    const token = JsonWebToken.sign({
      id: user.id,
      email: user.email,
    });

    res.cookie("auth", token).status(201).send(user);
  } catch (err) {
    next(err);
  }
};
