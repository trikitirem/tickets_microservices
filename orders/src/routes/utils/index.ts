import z from "zod";

export enum Routes {
  INDEX = "/api/orders",
}

export const OrderBody = z.object({
  amount: z.number().gt(0),
  ticketId: z.string().length(24),
});

export type OrderBody = z.infer<typeof OrderBody>;
