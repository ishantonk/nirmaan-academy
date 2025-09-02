import { z } from "zod";
import { BannerBaseSchema } from "./base";

export const CreateBannerSchema = BannerBaseSchema;

export type CreateBannerInput = z.infer<typeof CreateBannerSchema>;
