import { z } from "zod";
import { optionalTrimmedString, optionalCuid } from "../utils";

export const CourseListQuerySchema = z.object({
  q: optionalTrimmedString(191), // search by title or description
  categoryId: optionalCuid,
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  isTrending: z.boolean().optional(),
  onSale: z.boolean().optional(),
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z
    .enum(["createdAt", "updatedAt", "title", "priority"])
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type CourseListQueryInput = z.infer<typeof CourseListQuerySchema>;
