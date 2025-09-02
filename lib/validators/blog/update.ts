import { z } from "zod";
import { BlogPostBaseSchema } from "./base";

export const UpdateBlogPostSchema = BlogPostBaseSchema.partial()
  .extend({
    id: z.string().cuid({ message: "Valid Blog Post ID is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.status === "PUBLISHED" && !data.publishedAt) {
      ctx.addIssue({
        code: "custom",
        path: ["publishedAt"],
        message: "Published posts must have a publishedAt date",
      });
    }
  });

export type UpdateBlogPostInput = z.infer<typeof UpdateBlogPostSchema>;
