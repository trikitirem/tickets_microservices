import { Request, Response } from "express";

export const signOut = (_: Request, res: Response) => {
  res
    .cookie("auth", "", { expires: new Date() })
    .status(200)
    .send({ ok: true });
};
