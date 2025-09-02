import { z } from "zod";
import { optionalTrimmedString, optionalCuid, StatusEnum } from "../utils";

export const BlogCategoryListQuerySchema = z.object({
  q: optionalTrimmedString(191), // search by name or slug
  status: StatusEnum.optional(),
  isPopular: z.coerce.boolean().optional(),
  parentId: optionalCuid,
  cursor: optionalCuid,
  take: z.coerce.number().int().min(1).max(100).default(20),
  orderBy: z
    .enum(["createdAt", "updatedAt", "name", "isPopular"])
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type BlogCategoryListQueryInput = z.infer<
  typeof BlogCategoryListQuerySchema
>;
