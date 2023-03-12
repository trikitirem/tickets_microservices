import { Schema, model } from "mongoose";
import { Ticket } from "./Ticket";
import { NotFoundError } from "@triki/common";

export type Order = {
  ticketId: string;
  userId: string;
  amount: number;
  createdAt: Date;
  due: number;
};

const orderSchema = new Schema<Order>(
  {
    ticketId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    due: {
      type: Number,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

orderSchema.pre("save", async function (next) {
  const ticket = await Ticket.findOne<Ticket>({ id: this.ticketId });

  console.log(ticket);

  if (!ticket || !ticket.price) {
    throw new NotFoundError();
  }

  this.due = this.amount * ticket.price;
  next();
});

export const Order = model<Order>("Order", orderSchema);
