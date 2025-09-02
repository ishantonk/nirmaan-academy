import { z } from "zod";
import { nameSchema } from "../utils";

export const TestimonialBaseSchema = z.object({
  name: nameSchema,

  role: z
    .string()
    .trim()
    .max(100, { message: "Role cannot exceed 100 characters" })
    .optional(),

  image: z.string().url({ message: "Image must be a valid URL" }).optional(),

  content: z
    .string()
    .trim()
    .min(1, { message: "Content is required" })
    .max(1000, { message: "Content cannot exceed 1000 characters" }),

  rating: z
    .number()
    .int()
    .min(0, { message: "Rating cannot be negative" })
    .max(5, { message: "Rating cannot exceed 5" })
    .default(0),
});

export type TestimonialBaseInput = z.infer<typeof TestimonialBaseSchema>;
