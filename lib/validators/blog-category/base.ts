import { z } from "zod";
import {
  StatusEnum,
  optionalTrimmedString,
  MetaKeywordsInput,
  optionalCuid,
  nameSchema,
  slugSchema,
} from "../utils";

export const BlogCategoryBaseSchema = z.object({
  name: nameSchema,
  slug: slugSchema,
  description: optionalTrimmedString(2000),
  status: StatusEnum.default("ACTIVE"),
  isPopular: z.boolean().default(false),

  // SEO meta fields
  metaTitle: optionalTrimmedString(70),
  metaKeywords: MetaKeywordsInput,
  metaDescription: optionalTrimmedString(160),

  // Foreign Keys
  parentId: optionalCuid,
});

export type BlogCategoryBaseInput = z.infer<typeof BlogCategoryBaseSchema>;
