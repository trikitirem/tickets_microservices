import { BusEvent } from "@triki/common";
import { Ticket } from "./dto";

export class TestEvent extends BusEvent<{ message: string }> {
  type = "TEST_EVENT";
}

type TicketCreatedEvent = {
  type: "TICKET_CREATED";
  payload: Ticket;
};

type TicketUpdatedEvent = {
  type: "TICKET_UPDATED";
  payload: Ticket;
};

export type Event = TicketCreatedEvent | TicketUpdatedEvent;
