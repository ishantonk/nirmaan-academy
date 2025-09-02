import { z } from "zod";
import { BlogPostBaseSchema } from "./base";

export const CreateBlogPostSchema = BlogPostBaseSchema.superRefine(
  (data, ctx) => {
    if (data.status === "PUBLISHED" && !data.publishedAt) {
      ctx.addIssue({
        code: "custom",
        path: ["publishedAt"],
        message: "Published posts must have a publishedAt date",
      });
    }
  }
);

export type CreateBlogPostInput = z.infer<typeof CreateBlogPostSchema>;
