import { z } from "zod";
import {
  optionalTrimmedString,
  nameSchema,
  StatusEnum,
  slugSchema,
} from "../utils";

export const EbookBaseSchema = z.object({
  name: nameSchema,
  slug: slugSchema,
  description: optionalTrimmedString(1000),
  thumbnail: optionalTrimmedString(500),
  pdfFile: z
    .string()
    .trim()
    .url({ message: "PDF file must be a valid URL" })
    .min(1, { message: "PDF file URL is required" }),
  status: StatusEnum.default("ACTIVE"),

  // SEO meta fields
  metaTitle: optionalTrimmedString(70),
  metaKeywords: optionalTrimmedString(500),
  metaDescription: optionalTrimmedString(160),

  // Foreign Keys
  categoryId: z.string().cuid({ message: "Valid category ID is required" }),
  professorId: z.string().cuid({ message: "Valid professor ID is required" }),
});

export type EbookBaseInput = z.infer<typeof EbookBaseSchema>;
