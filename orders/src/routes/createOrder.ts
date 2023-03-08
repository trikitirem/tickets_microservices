import { Router, Request, Response, NextFunction } from "express";
import { Routes, OrderBody } from "./utils";
import { requireAuth } from "@triki/common";
import { Order } from "../models";

const router = Router();

router.post(
  Routes.INDEX,
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = OrderBody.parse(req.body);
      const { id: userId } = req.currentUser!;

      const order = new Order({ ...body, userId });
      await order.save();

      const { id, createdAt } = order;
      res.status(201).send({ ...body, createdAt, id });
    } catch (err) {
      next(err);
    }
  }
);

export { router as createOrderRouter };
