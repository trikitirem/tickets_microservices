import { Ticket } from "./dto";

type TicketCreatedEvent = {
  type: "TICKET_CREATED";
  payload: Ticket;
};

type TicketUpdatedEvent = {
  type: "TICKET_UPDATED";
  payload: Ticket;
};

export type Event = TicketCreatedEvent | TicketUpdatedEvent;
