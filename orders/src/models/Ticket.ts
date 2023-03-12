import { Schema, model } from "mongoose";

export type Ticket = {
  id: string;
  price: number;
};

const ticketSchema = new Schema<Ticket>(
  {
    price: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

export const Ticket = model<Ticket>("Ticket", ticketSchema);
