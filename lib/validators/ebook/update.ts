import { z } from "zod";
import { EbookBaseSchema } from "./base";

export const UpdateEbookSchema = EbookBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid Ebook ID is required" }),
});

export type UpdateEbookInput = z.infer<typeof UpdateEbookSchema>;
