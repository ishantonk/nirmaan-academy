import { z } from "zod";
import { BannerBaseSchema } from "./base";

export const UpdateBannerSchema = BannerBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid Banner ID is required" }),
});

export type UpdateBannerInput = z.infer<typeof UpdateBannerSchema>;
