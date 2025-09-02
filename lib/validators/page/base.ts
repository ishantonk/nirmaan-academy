import { z } from "zod";
import {
  MetaKeywordsInput,
  optionalTrimmedString,
  slugSchema,
  StatusEnum,
  titleSchema,
} from "../utils";

export const PageBaseSchema = z.object({
  title: titleSchema,
  slug: slugSchema,
  banner: z
    .string()
    .trim()
    .url({ message: "Banner must be a valid URL" })
    .optional(),
  content: z.string().trim().min(1, { message: "Content is required" }),
  status: StatusEnum.default("ACTIVE"),

  // SEO meta fields
  metaTitle: optionalTrimmedString(70),
  metaKeywords: MetaKeywordsInput,
  metaDescription: optionalTrimmedString(160),
});

export type PageBaseInput = z.infer<typeof PageBaseSchema>;
