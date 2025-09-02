import { z } from "zod";
import { PageBaseSchema } from "./base";

export const UpdatePageSchema = PageBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid Page ID is required" }),
});

export type UpdatePageInput = z.infer<typeof UpdatePageSchema>;
