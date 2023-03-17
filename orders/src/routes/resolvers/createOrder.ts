import { Request, Response, NextFunction } from "express";
import { Order } from "../../models";
import { OrderBody } from "../utils";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
