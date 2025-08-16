import { z } from "zod";
import { optionalTrimmedString, optionalCuid } from "../utils";

export const AttemptListQuerySchema = z.object({
    q: optionalTrimmedString(191), // search by title
    courseId: optionalCuid,
    cursor: optionalCuid,
    take: z.number().int().min(1).max(100).default(20),
    orderBy: z.enum(["createdAt", "updatedAt", "title"]).default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
});

export type AttemptListQuery = z.infer<typeof AttemptListQuerySchema>;
