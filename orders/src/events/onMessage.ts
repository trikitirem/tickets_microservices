import { Message } from "amqplib";
import { Event } from "./event";
import { createTicket, updateTicket } from "./handlers";

export const onMessage = (message: Message | null) => {
  if (message) {
    const event = JSON.parse(message.content.toString()) as Event;

    console.log(`Received message ${event.type}`);

    switch (event.type) {
      case "TICKET_CREATED":
        return createTicket(event.payload);
      case "TICKET_UPDATED":
        return updateTicket(event.payload);
      default:
        return;
    }
  }
};
