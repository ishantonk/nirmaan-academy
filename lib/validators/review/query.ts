import { z } from "zod";
import { optionalCuid } from "../utils";

export const ReviewListQuerySchema = z.object({
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z.enum(["createdAt", "updatedAt", "rating"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),

  userId: optionalCuid,
  courseId: optionalCuid,
  rating: z.number().int().min(1).max(5).optional(),
});

export type ReviewListQueryInput = z.infer<typeof ReviewListQuerySchema>;
