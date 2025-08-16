import { z } from "zod";
import {
    optionalTrimmedString,
    optionalCuid,
    MetaKeywordsInput,
    StatusEnum,
} from "../utils";

export const CategoryBaseSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" })
        .min(2, { message: "Name must be at least 2 characters" })
        .max(120, { message: "Name must be at most 120 characters" }),

    description: optionalTrimmedString(2000),

    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, { message: "Slug is required" })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: "Slug can contain lowercase letters, numbers, and hyphens",
        })
        .max(191, { message: "Slug must be <= 191 characters" }),

    status: StatusEnum.default("ACTIVE"),
    isPopular: z.boolean().default(false),

    metaTitle: optionalTrimmedString(70),
    metaKeywords: MetaKeywordsInput,
    metaDescription: optionalTrimmedString(160),

    parentId: optionalCuid,
});

export type CategoryBaseInput = z.infer<typeof CategoryBaseSchema>;
