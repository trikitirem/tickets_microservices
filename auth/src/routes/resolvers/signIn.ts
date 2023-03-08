import { Request, Response, NextFunction } from "express";
import { Password } from "../../services";
import { BadRequestError, NotFoundError, JsonWebToken } from "@triki/common";
import { Auth, ErrorMessages } from "../utils";
import { User } from "../../models";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = Auth.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);
    }

    const passwordValid = await Password.compare(password, user.password);
    if (!passwordValid) {
      throw new BadRequestError(ErrorMessages.PASSWORD_INVALID);
    }

    const token = JsonWebToken.sign({ id: user._id, email });

    res.cookie("auth", token).status(200).send(user);
  } catch (err) {
    next(err);
  }
};
