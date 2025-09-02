import { z } from "zod";

export const UserListQuerySchema = z.object({
  cursor: z.string().cuid().optional(),
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z.enum(["createdAt", "updatedAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),

  role: z.enum(["STUDENT", "ADMIN"]).optional(),
  search: z.string().optional(), // for name/email search
});

export type UserListQueryInput = z.infer<typeof UserListQuerySchema>;
