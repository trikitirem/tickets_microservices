import { Ticket } from "./dto";
import { Ticket as MongoTicket } from "../models/Ticket";

export const createTicket = async (payload: Ticket) => {
  try {
    const ticket = new MongoTicket({ ...payload });
    await ticket.save();
  } catch (err) {
    console.log(err);
  }
};
export const updateTicket = async (payload: Ticket) => {
  try {
    const { id, price } = payload;

    await MongoTicket.findByIdAndUpdate(id, { price });
  } catch (err) {
    console.log(err);
  }
};
