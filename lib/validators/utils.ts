import { z } from "zod";

// Keep these in sync with your Prisma enum
export const StatusEnum = z.enum(["ACTIVE", "INACTIVE"]);

// Converts empty strings to undefined, trims, and makes it optional
export const optionalTrimmedString = (max?: number) =>
    z
        .string()
        .trim()
        .transform((val) => (val === "" ? undefined : val))
        .optional()
        .refine((val) => (max ? (val ? val.length <= max : true) : true), {
            message: max ? `Must be at most ${max} characters` : undefined,
        });

export function addCustomIssue(
    ctx: {
        addIssue: (issue: {
            path: string[];
            code: "custom";
            message: string;
        }) => void;
    },
    path: string[],
    message: string
) {
    ctx.addIssue({
        path,
        code: "custom",
        message,
    });
}

export const normalizeName = (input: string) =>
    input
        .trim()
        .split(/\s+/)
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

export const decimalSchema = (min = 0) =>
    z.coerce
        .number()
        .min(min, { message: `Value must be at least ${min}` })
        .transform((val) => parseFloat(val.toFixed(2))); // Normalize to 2 decimals

// Convert name or title to slug
export const normalizeSlug = (input: string) =>
    input
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace invalid chars with hyphen
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

// Optional CUID (with empty string support)
export const optionalCuid = z
    .string()
    .cuid()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val))
    .optional();

// Meta Keywords: string or string[], stored as comma-separated string
export const MetaKeywordsInput = z
    .union([
        z.string().trim(),
        z
            .array(z.string().trim())
            .transform((arr) => arr.filter(Boolean).join(",")),
    ])
    .transform((val) => {
        if (typeof val === "string") {
            return val.trim() === "" ? undefined : val.trim();
        }
        return val;
    })
    .optional();
