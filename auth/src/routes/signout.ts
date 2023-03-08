import { Router } from "express";
import { Routes } from "./utils";

const router = Router();

router.post(Routes.SignOut, (_, res) => {
  res.cookie("auth", "", { expires: new Date() });

  res.status(200).send({ ok: true });
});

export { router as signOutRouter };
