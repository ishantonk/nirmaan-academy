import { z } from "zod";
import { ContentTypeEnum, optionalTrimmedString } from "../utils";

export const BannerBaseSchema = z.object({
  type: ContentTypeEnum.default("IMAGE"),

  fileUrl: z.string().trim().min(1, { message: "File URL is required" }),

  altText: optionalTrimmedString(191),
});

export type BannerBaseInput = z.infer<typeof BannerBaseSchema>;
