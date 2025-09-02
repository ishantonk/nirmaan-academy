import { z } from "zod";
import { optionalTrimmedString, optionalCuid, ContentTypeEnum } from "../utils";

export const BannerListQuerySchema = z.object({
  q: optionalTrimmedString(191), // Optional search (maybe for altText)
  type: ContentTypeEnum.optional(),
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z.enum(["createdAt", "updatedAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type BannerListQueryInput = z.infer<typeof BannerListQuerySchema>;
