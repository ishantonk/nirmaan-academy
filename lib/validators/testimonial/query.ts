import { z } from "zod";
import { optionalCuid } from "../utils";

export const TestimonialListQuerySchema = z.object({
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z.enum(["createdAt", "updatedAt", "rating"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),

  minRating: z.number().int().min(0).max(5).optional(),
  maxRating: z.number().int().min(0).max(5).optional(),
});

export type TestimonialListQueryInput = z.infer<
  typeof TestimonialListQuerySchema
>;
