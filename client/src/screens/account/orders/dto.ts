import { Ticket } from "../../../models";

export type Order = {
  id: string;
  ticketId: string;
  userId: string;
  amount: string;
  createdAt: string;
  due: number;
};

export type OrderResponse = { orders: Order[] };

export type MyTicektsResponse = { tickets: Ticket[] };
