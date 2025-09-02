import { z } from "zod";
import { MetaKeywordsInput, nameSchema, optionalTrimmedString } from "../utils";

export const WebsiteSettingBaseSchema = z.object({
  applicationName: nameSchema,
  tagline: z
    .string()
    .max(150, { message: "Tagline cannot exceed 150 characters" })
    .optional(),

  bannerText: z
    .string()
    .max(200, { message: "Banner text cannot exceed 200 characters" })
    .optional(),

  supportEmail: z
    .string()
    .email({ message: "Support email must be a valid email address" }),

  supportPhone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, { message: "Invalid phone number format" })
    .optional(),

  officialEmail: z
    .string()
    .email({ message: "Official email must be valid" })
    .optional(),

  companyAddress: optionalTrimmedString(),

  logo: z.string().url({ message: "Logo must be a valid URL" }),

  favicon: z
    .string()
    .url({ message: "Favicon must be a valid URL" })
    .optional(),

  // SEO meta fields
  metaTitle: optionalTrimmedString(70),
  metaKeywords: MetaKeywordsInput,
  metaDescription: optionalTrimmedString(160),
});

export type WebsiteSettingBaseInput = z.infer<typeof WebsiteSettingBaseSchema>;
