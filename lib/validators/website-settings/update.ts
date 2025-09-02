import { WebsiteSettingBaseSchema } from "./base";
import { z } from "zod";

export const UpdateWebsiteSettingSchema = WebsiteSettingBaseSchema.partial();

export type UpdateWebsiteSettingInput = z.infer<
  typeof UpdateWebsiteSettingSchema
>;
