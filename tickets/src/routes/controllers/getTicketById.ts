import { Request, Response, NextFunction } from "express";
import { Ticket } from "../../models";
import { IdParam } from "../utils";
import { NotFoundError } from "@triki/common";

export const getTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = IdParam.parse(req.params.id);

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }

    res.status(200).send(ticket);
  } catch (err) {
    next(err);
  }
};
