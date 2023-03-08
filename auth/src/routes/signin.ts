import { Router } from "express";
import { Routes, Auth, ErrorMessages } from "./utils";
import { User } from "../models";
import { Password } from "../services";
import { sign, NotFoundError, BadRequestError } from "@triki/common";

const router = Router();

router.post(Routes.SignIn, async (req, res, next) => {
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

    const token = sign({ id: user._id, email });

    res.cookie("auth", token).status(200).send(user);
  } catch (err) {
    next(err);
  }
});

export { router as signInRouter };
