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
  },
  {
    _id: false,
    toJSON: {
      transform(_, ret) {
        delete ret.password;

        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

export const Ticket = model<Ticket>("Ticket", ticketSchema);
