import { Router } from "express";
import { Routes } from "./utils";
import { currentUser, requireAuth } from "@triki/common";

const router = Router();

router.get(Routes.CurrentUser, currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser ?? null });
});

export { router as currentUserRouter };
