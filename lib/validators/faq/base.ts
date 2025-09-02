import { z } from "zod";
import { StatusEnum } from "../utils";

export const FaqBaseSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, { message: "Question is required" })
    .max(500, { message: "Question must be at most 500 characters" }),

  answer: z
    .string()
    .trim()
    .min(1, { message: "Answer is required" })
    .max(5000, { message: "Answer must be at most 5000 characters" }),

  preference: z
    .number()
    .int()
    .min(0, { message: "Preference must be >= 0" })
    .default(0),

  status: StatusEnum.default("ACTIVE"),
});

export type FaqBaseInput = z.infer<typeof FaqBaseSchema>;
