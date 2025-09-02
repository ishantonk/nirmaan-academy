import { z } from "zod";
import { CategoryBaseSchema } from "./base";

export const CreateCategorySchema = CategoryBaseSchema;

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
