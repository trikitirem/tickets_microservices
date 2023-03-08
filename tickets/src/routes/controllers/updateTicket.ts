import { Request, Response, NextFunction } from "express";
import { IdParam, TicketBody } from "../utils";
import { Ticket } from "../../models";
import { EventBus, ForbiddenError, NotFoundError } from "@triki/common";
import { EventType, TicketUpdatedEvent } from "../../events";

export const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = TicketBody.parse(req.body);
    const ticketId = IdParam.parse(req.params.id);

    const { id: userId } = req.currentUser!;

    const ticket = await Ticket.findById<Ticket>(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId != userId) {
      throw new ForbiddenError();
    }

    await Ticket.findByIdAndUpdate(ticketId, { ...body });

    const eventBus = EventBus.getInstance();
    const event: TicketUpdatedEvent = {
      type: EventType.TICKET_UPDATED,
      payload: {
        ...ticket,
        ...body,
        id: ticketId,
      },
    };
    eventBus.sendEvent(event);

    res.send({ ok: true });
  } catch (err) {
    next(err);
  }
};
