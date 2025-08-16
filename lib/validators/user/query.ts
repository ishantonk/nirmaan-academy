import { z } from "zod";

export const UserListQuerySchema = z.object({
    search: z.string().optional(), // Search by name/email
    role: z.enum(["STUDENT", "ADMIN"]).optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    sort: z.enum(["asc", "desc"]).default("asc"),
});

export type UserListQueryInput = z.infer<typeof UserListQuerySchema>;
