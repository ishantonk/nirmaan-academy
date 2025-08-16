import { z } from "zod";
import { CourseStatusEnum } from "./base";

export const CourseListQuerySchema = z.object({
    q: z.string().trim().max(120).optional(),
    status: CourseStatusEnum.optional(),
    isTrending: z.boolean().optional(),
    onSale: z.boolean().optional(),
    categoryId: z.string().cuid().optional(),
    cursor: z.string().cuid().optional(),
    take: z.number().int().min(1).max(100).default(20),
    orderBy: z
        .enum(["createdAt", "updatedAt", "title", "priority"])
        .default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
});
export type CourseListQuery = z.infer<typeof CourseListQuerySchema>;
