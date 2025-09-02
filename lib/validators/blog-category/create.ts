import z from "zod";
import { BlogCategoryBaseSchema } from "./base";

export const CreateBlogCategorySchema = BlogCategoryBaseSchema;

export type CreateBlogCategoryInput = z.infer<typeof CreateBlogCategorySchema>;
