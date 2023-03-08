import { Request, Response, NextFunction } from "express";
import { Ticket } from "../../models";

export const getTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets = await Ticket.find({});

    res.send({ tickets });
  } catch (err) {
    next(err);
  }
};
