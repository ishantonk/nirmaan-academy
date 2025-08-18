import { z } from "zod";
import { CategoryBaseSchema } from "./base";
import { normalizeSlug } from "../utils";

export const CreateCategorySchema = CategoryBaseSchema.superRefine(
    (data, ctx) => {
        if (!data.slug || data.slug.trim() === "") {
            if (data.name) {
                data.slug = normalizeSlug(data.name);
            } else {
                ctx.addIssue({
                    path: ["slug"],
                    code: "custom",
                    message: "Slug is required if name is missing",
                });
            }
        } else {
            data.slug = normalizeSlug(data.slug);
        }
    }
);

export type CreateCategoryInput = z.input<typeof CreateCategorySchema>;
