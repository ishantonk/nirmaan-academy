import { z } from "zod";
import { EbookCategoryBaseSchema } from "./base";

export const UpdateEbookCategorySchema =
  EbookCategoryBaseSchema.partial().extend({
    id: z.string().cuid({ message: "Valid Ebook Category ID is required" }),
  });

export type UpdateEbookCategoryInput = z.infer<
  typeof UpdateEbookCategorySchema
>;
