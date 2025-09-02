import { z } from "zod";
import { BlogCategoryBaseSchema } from "./base";

export const UpdateBlogCategorySchema = BlogCategoryBaseSchema.partial().extend(
  {
    id: z.string().cuid({ message: "Valid Blog Category ID is required" }),
  }
);

export type UpdateBlogCategoryInput = z.infer<typeof UpdateBlogCategorySchema>;
