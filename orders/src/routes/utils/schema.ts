import z from "zod";
import { OrdersErrors } from "./errors";

export const OrderBody = z.object({
  amount: z
    .number({
      invalid_type_error: OrdersErrors.AMOUNT_INVALID,
      required_error: OrdersErrors.AMOUNT_INVALID,
    })
    .gt(0, OrdersErrors.AMOUNT_INVALID),
  ticketId: z
    .string({
      invalid_type_error: OrdersErrors.TICKET_ID_INVALID,
      required_error: OrdersErrors.TICKET_ID_INVALID,
    })
    .length(24, OrdersErrors.TICKET_ID_INVALID),
});

export type OrderBody = z.infer<typeof OrderBody>;
