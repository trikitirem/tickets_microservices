import { Request, Response, NextFunction } from "express";
import { Ticket } from "../../models";
import { TicketBody } from "../utils";
import { EventBus } from "@triki/common";
import { EventType, TicketCreatedEvent } from "../../events";

export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, price } = TicketBody.parse(req.body);
    const { id: userId } = req.currentUser!;

    const ticket = new Ticket({ title, price, userId });
    await ticket.save();

    const { _id, createdAt } = ticket;
    const eventBus = EventBus.getInstance();

    const event: TicketCreatedEvent = {
      type: EventType.TICKET_CREATED,
      payload: {
        title,
        price,
        userId,
        createdAt,
        id: _id.toString(),
      },
    };

    eventBus.sendEvent(event);

    res.status(201).send(ticket);
  } catch (err) {
    next(err);
  }
};
