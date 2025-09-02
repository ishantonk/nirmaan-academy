import { z } from "zod";
import {
  optionalTrimmedString,
  MetaKeywordsInput,
  titleSchema,
  slugSchema,
} from "../utils";

/** Keep this in sync with Prisma enum BlogStatus */
export const BlogStatusEnum = z.enum(["DRAFT", "PUBLISHED"]);

export const BlogPostBaseSchema = z.object({
  title: titleSchema,

  slug: slugSchema,

  excerpt: optionalTrimmedString(300),

  content: z.string().trim().min(1, { message: "Content is required" }),

  featuredImage: optionalTrimmedString(1000),
  featuredImageAlt: optionalTrimmedString(191),

  publishedAt: z
    .preprocess((val) => (val === "" ? undefined : val), z.date())
    .optional(),

  readTimeMinutes: z
    .number()
    .int()
    .min(1, { message: "Read time must be at least 1 minute" })
    .optional(),

  status: BlogStatusEnum.default("DRAFT"),

  // SEO meta fields
  metaTitle: optionalTrimmedString(70),
  metaKeywords: MetaKeywordsInput,
  metaDescription: optionalTrimmedString(160),

  // Foreign Keys
  authorId: z.string().cuid({ message: "Valid Author ID is required" }),
  categoryId: z.string().cuid({ message: "Valid Category ID is required" }),
});

export type BlogPostBaseInput = z.infer<typeof BlogPostBaseSchema>;
