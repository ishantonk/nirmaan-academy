import { z } from "zod";

// Pagination schema
const PaginationSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
});

// Sort options
const SortOrderSchema = z.enum(["asc", "desc"]).default("desc");

// Query schema
export const ReviewListQuerySchema = PaginationSchema.extend({
    courseId: z
        .string()
        .cuid({ message: "Valid Course ID is required" })
        .optional(),
    userId: z
        .string()
        .cuid({ message: "Valid User ID is required" })
        .optional(),
    minRating: z.coerce.number().int().min(1).max(5).optional(),
    maxRating: z.coerce.number().int().min(1).max(5).optional(),
    sortBy: z.enum(["createdAt", "rating"]).default("createdAt"),
    sortOrder: SortOrderSchema,
}).superRefine((data, ctx) => {
    if (data.minRating && data.maxRating && data.minRating > data.maxRating) {
        ctx.addIssue({
            path: ["minRating"],
            code: "custom",
            message: "minRating cannot be greater than maxRating",
        });
    }
});

export type ReviewListQueryInput = z.infer<typeof ReviewListQuerySchema>;
