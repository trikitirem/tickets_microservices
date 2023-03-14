import { Request, Response, NextFunction } from "express";
import { Ticket } from "../../models";

export const getMyTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.currentUser!;

    const tickets = await Ticket.find({ userId });
    res.send({ tickets });
  } catch (err) {
    next(err);
  }
};
