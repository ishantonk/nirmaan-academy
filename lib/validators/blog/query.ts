import { z } from "zod";
import { optionalTrimmedString, optionalCuid } from "../utils";
import { BlogStatusEnum } from "./base";

export const BlogPostListQuerySchema = z.object({
  q: optionalTrimmedString(191), // search by title or content
  status: BlogStatusEnum.optional(),
  categoryId: optionalCuid,
  authorId: optionalCuid,
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z
    .enum(["createdAt", "updatedAt", "title", "publishedAt"])
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type BlogPostListQueryInput = z.infer<typeof BlogPostListQuerySchema>;
