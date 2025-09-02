import { z } from "zod";
import { nameSchema, optionalTrimmedString } from "../utils";

export const ContactMessageBaseSchema = z.object({
  name: nameSchema,

  email: z
    .string()
    .trim()
    .email({ message: "A valid email is required" })
    .max(255, { message: "Email must be at most 255 characters" }),

  phone: optionalTrimmedString(20), // Optional, but if provided, trimmed and max length check
  subject: optionalTrimmedString(191),

  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Message must be at most 2000 characters" }),
});

export type ContactMessageBaseInput = z.infer<typeof ContactMessageBaseSchema>;
