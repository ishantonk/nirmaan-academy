import { z } from "zod";

export const ReviewBaseSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" }),

  comment: z
    .string()
    .trim()
    .max(500, { message: "Comment cannot exceed 500 characters" })
    .optional(),

  userId: z.string().cuid({ message: "Valid userId is required" }),
  courseId: z.string().cuid({ message: "Valid courseId is required" }),
});

export type ReviewBaseInput = z.infer<typeof ReviewBaseSchema>;
