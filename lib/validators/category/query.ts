import { z } from "zod";
import { optionalTrimmedString, optionalCuid, StatusEnum } from "../utils";

export const CategoryListQuerySchema = z.object({
    q: optionalTrimmedString(120),
    status: StatusEnum.optional(),
    parentId: optionalCuid,
    isPopular: z.boolean().optional(),
    cursor: optionalCuid,
    take: z.number().int().min(1).max(100).default(20),
    orderBy: z
        .enum(["createdAt", "updatedAt", "name", "popular"])
        .default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
});

export type CategoryListQuery = z.infer<typeof CategoryListQuerySchema>;
