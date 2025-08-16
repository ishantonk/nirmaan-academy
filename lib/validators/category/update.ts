import { z } from "zod";
import { CategoryBaseSchema } from "./base";
import { normalizeSlug } from "../utils";

export const UpdateCategorySchema = CategoryBaseSchema.partial()
    .extend({
        id: z.string().cuid({ message: "Valid Category id is required" }),
    })
    .transform((data) => {
        if (data.slug) {
            data.slug = normalizeSlug(data.slug);
        }
        return data;
    });

export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
