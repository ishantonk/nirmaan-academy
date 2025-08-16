import { z } from "zod";

export const ReviewBaseSchema = z.object({
    rating: z
        .number()
        .int({ message: "Rating must be an integer" })
        .min(1, { message: "Rating must be at least 1" })
        .max(5, { message: "Rating cannot exceed 5" }),

    comment: z
        .string()
        .trim()
        .max(1000, { message: "Comment cannot exceed 1000 characters" })
        .optional(),
});

export type ReviewBaseInput = z.infer<typeof ReviewBaseSchema>;
