import { Ticket } from "../models";

export enum EventType {
  TICKET_CREATED = "TICKET_CREATED",
  TICKET_UPDATED = "TICKET_UPDATED",
}

export type TicketUpdatedEvent = {
  type: EventType.TICKET_UPDATED;
  payload: Ticket & { id: string };
};

export type TicketCreatedEvent = {
  type: EventType.TICKET_CREATED;
  payload: Ticket & { id: string };
};
