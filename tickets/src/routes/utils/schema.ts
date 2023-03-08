import z from "zod";
import { TicketErrorMessages } from "./errors";

export const TicketBody = z.object({
  title: z
    .string({
      invalid_type_error: TicketErrorMessages.TITLE_INVALID,
      required_error: TicketErrorMessages.TITLE_REQUIRED,
    })
    .min(1, TicketErrorMessages.TITLE_INVALID),
  price: z
    .number({
      invalid_type_error: TicketErrorMessages.PRICE_INVALID,
      required_error: TicketErrorMessages.PRICE_REQUIRED,
    })
    .positive(TicketErrorMessages.PRICE_INVALID),
});

export type TicketBody = z.infer<typeof TicketBody>;

export const IdParam = z.string().length(24, TicketErrorMessages.ID_INVALID);
