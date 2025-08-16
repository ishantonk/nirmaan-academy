import { z } from "zod";
import {
    normalizeName,
    optionalTrimmedString,
    MetaKeywordsInput,
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
    title: z
        .string()
        .trim()
        .min(3, { message: "Course title must be at least 3 characters" })
        .max(150, { message: "Course title must be at most 150 characters" })
        .transform(normalizeName),

    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, { message: "Slug is required" })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: "Slug can contain lowercase letters, numbers, and hyphens",
        })
        .max(191, { message: "Slug must be <= 191 characters" }),

    description: z
        .string()
        .trim()
        .max(5000, { message: "Description too long" })
        .optional(),
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

    // SEO meta
    metaTitle: optionalTrimmedString(70),
    metaKeywords: MetaKeywordsInput,
    metaDescription: optionalTrimmedString(160),

    categoryId: z.string().cuid({ message: "Valid Category ID is required" }),
});

export type CourseBaseInput = z.infer<typeof CourseBaseSchema>;