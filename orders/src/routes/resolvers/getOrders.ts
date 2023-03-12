import { Request, Response, NextFunction } from "express";
import { Order } from "../../models";

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.currentUser!;

    const orders = await Order.find({ userId });

    res.send({ orders });
  } catch (err) {
    next(err);
  }
};
