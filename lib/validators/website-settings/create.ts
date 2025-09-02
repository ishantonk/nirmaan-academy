import { WebsiteSettingBaseSchema } from "./base";
import { z } from "zod";

export const CreateWebsiteSettingSchema = WebsiteSettingBaseSchema.extend({
  // If there are unique constraints or defaults, handle them here
});

export type CreateWebsiteSettingInput = z.infer<
  typeof CreateWebsiteSettingSchema
>;
