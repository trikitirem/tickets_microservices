import z from "zod";
import { ErrorMessages } from "./errors";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const strongPasswordRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

export const Auth = z.object({
  email: z
    .string({
      invalid_type_error: ErrorMessages.EMAIL_INVALID,
      required_error: ErrorMessages.EMAIL_REQUIRED,
    })
    .regex(emailRegex, ErrorMessages.EMAIL_INVALID),
  password: z
    .string({
      invalid_type_error: ErrorMessages.PASSWORD_INVALID,
      required_error: ErrorMessages.PASSWORD_REQUIRED,
    })
    .regex(strongPasswordRegex, ErrorMessages.PASSWORD_TO_WEAK),
});

export type Auth = z.infer<typeof Auth>;
