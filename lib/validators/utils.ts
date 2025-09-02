import { z } from "zod";

/** Keep these in sync with your Prisma enum */
export const StatusEnum = z.enum(["ACTIVE", "INACTIVE"]);

/** Keep this in sync with Prisma enum ContentType */
export const ContentTypeEnum = z.enum(["IMAGE", "VIDEO"]);

/**
 * Creates an optional trimmed string schema.
 * - Converts empty strings to undefined.
 * - Trims whitespace.
 * - Enforces max length if provided.
 */
export const optionalTrimmedString = (max?: number) =>
  z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => (max ? (val ? val.length <= max : true) : true), {
      message: max ? `Must be at most ${max} characters` : undefined,
    })
    .optional();

/**
 * Add a custom Zod issue with a specific path and message.
 */
export function addCustomIssue(
  ctx: {
    addIssue: (issue: {
      path: (string | number)[];
      code: "custom";
      message: string;
    }) => void;
  },
  path: (string | number)[],
  message: string
) {
  ctx.addIssue({ path, code: "custom", message });
}

/**
 * Normalizes a name by capitalizing each word.
 */
export const normalizeName = (input: string) =>
  input
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

/**
 * Decimal schema that:
 * - Coerces to number
 * - Enforces minimum value
 * - Normalizes to 2 decimal places
 */
export const decimalSchema = (min = 0) =>
  z.coerce
    .number()
    .min(min, { message: `Value must be at least ${min}` })
    .transform((val) => parseFloat(val.toFixed(2)));

/**
 * Converts name or title to slug.
 */
export const normalizeSlug = (input: string) =>
  input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace invalid chars with hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

/**
 * nameSchema:
 * Validates a "name" string with the following rules:
 * - Required (must not be empty)
 * - Maximum length of 191 characters
 * - Normalizes the name by trimming and removing extra spaces
 */
export const nameSchema = z
  .string()
  .min(1, { message: "Name is required" })
  .max(151, { message: "Name must be at most 151 characters" })
  .transform(normalizeName);

/**
 * titleSchema:
 * Validates a "title" string with the following rules:
 * - Trims leading and trailing whitespace
 * - Minimum length of 3 characters
 * - Maximum length of 191 characters
 * - Normalizes the title by removing extra spaces between words
 */
export const titleSchema = z
  .string()
  .trim()
  .min(3, { message: "Course title must be at least 3 characters" })
  .max(191, { message: "Course title must be at most 191 characters" })
  .transform(normalizeName);

/**
 * passwordSchema:
 * Validates a "password" string with:
 * - Minimum length: 8 characters
 * - At least one uppercase letter
 * - At least one number
 */
export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain a number" });

/**
 * slugSchema:
 * Validates a "slug" string with the following rules:
 * - Trims leading and trailing whitespace
 * - Converts to lowercase
 * - Minimum length of 1 character (unless it's an empty string)
 * - Must match the pattern: lowercase letters, numbers, and hyphens (no consecutive hyphens at start/end)
 * - Allows empty string as a valid value
 * - Normalizes the slug by replacing spaces with hyphens
 */
export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { message: "Slug is required" })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug can contain lowercase letters, numbers, and hyphens",
  })
  .or(z.literal("")) // Allow empty string as valid
  .transform((val) => normalizeSlug(val));

/**
 * Optional CUID schema:
 * - Allows empty string and converts to undefined
 */
export const optionalCuid = z
  .string()
  .cuid()
  .or(z.literal(""))
  .transform((val) => (val === "" ? undefined : val))
  .optional();

/**
 * Meta Keywords Schema:
 * - Accepts string OR array of strings
 * - Trims all keywords
 * - Joins array into a comma-separated string
 * - Converts empty result to undefined
 */
export const MetaKeywordsInput = z
  .union([
    z.string().trim(),
    z
      .array(z.string().trim())
      .transform((arr) => arr.filter(Boolean).join(",")),
  ])
  .transform((val) => {
    const normalized =
      typeof val === "string" ? val.trim() : String(val).trim();
    return normalized === "" ? undefined : normalized;
  })
  .optional();
