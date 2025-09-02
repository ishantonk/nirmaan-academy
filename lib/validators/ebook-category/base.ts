import { z } from "zod";
import {
  optionalTrimmedString,
  optionalCuid,
  nameSchema,
  slugSchema,
  StatusEnum,
} from "../utils";

export const EbookCategoryBaseSchema = z.object({
  name: nameSchema,
  slug: slugSchema,
  description: optionalTrimmedString(2000),
  status: StatusEnum.default("ACTIVE"),
  isPopular: z.boolean().default(false),

  // SEO fields
  metaTitle: optionalTrimmedString(70),
  metaKeywords: optionalTrimmedString(500),
  metaDescription: optionalTrimmedString(160),

  // Foreign key
  parentId: optionalCuid,
});

export type EbookCategoryBaseInput = z.infer<typeof EbookCategoryBaseSchema>;
