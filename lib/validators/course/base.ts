import { z } from "zod";
import {
  optionalTrimmedString,
  MetaKeywordsInput,
  nameSchema,
  slugSchema,
} from "../utils";

// Enums (match your Prisma enums)
export const CourseStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const StudyMaterialEnum = z.enum([
  "PENDRIVE",
  "DOWNLOAD",
  "WITH_HANDBOOK",
]);
export const LanguageEnum = z.enum(["ENGLISH", "HINDI", "HINDI_ENGLISH"]);

// Base Course Schema
export const CourseBaseSchema = z.object({
  title: nameSchema,
  slug: slugSchema,
  description: optionalTrimmedString(5000),
  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid URL" })
    .optional(),
  demoVideoUrl: z
    .string()
    .url({ message: "Demo video URL must be valid" })
    .optional(),

  onSale: z.boolean().default(false),
  isTrending: z.boolean().default(false),

  durationInMin: z
    .number()
    .int()
    .min(0, { message: "Duration cannot be negative" })
    .default(0),
  priority: z
    .number()
    .int()
    .min(0, { message: "Priority cannot be negative" })
    .default(0),

  status: CourseStatusEnum.default("DRAFT"),
  studyMaterial: StudyMaterialEnum,
  videoLanguage: LanguageEnum,
  courseMaterialLanguage: LanguageEnum,

  // SEO meta fields
  metaTitle: optionalTrimmedString(70),
  metaKeywords: MetaKeywordsInput,
  metaDescription: optionalTrimmedString(160),

  // Foreign Keys
  categoryId: z.string().cuid({ message: "Valid Category ID is required" }),
});

export type CourseBaseInput = z.infer<typeof CourseBaseSchema>;
