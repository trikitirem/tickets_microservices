import { Schema, model } from "mongoose";

export type Ticket = {
  title: string;
  price: number;
  userId: string;
  createdAt: Date;
};

const ticketSchema = new Schema<Ticket>(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
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

export const Ticket = model<Ticket>("Ticket", ticketSchema);
