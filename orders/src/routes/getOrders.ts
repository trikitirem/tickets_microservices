import { Router, Request, Response, NextFunction } from "express";
import { Routes } from "./utils";
import { requireAuth } from "@triki/common";
import { Order } from "../models";

const router = Router();

router.get(
  Routes.INDEX,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.currentUser!;

      const orders = await Order.find({ userId });

      res.send({ orders });
    } catch (err) {
      next(err);
    }
  }
);

export { router as getOrdersRouter };
