import { z } from "zod";
import { CategoryBaseSchema } from "./base";

export const UpdateCategorySchema = CategoryBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid Category id is required" }),
});

export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
