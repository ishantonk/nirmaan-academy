import { z } from "zod";
import { optionalTrimmedString, optionalCuid } from "../utils";

export const FacultyListQuerySchema = z.object({
  q: optionalTrimmedString(191), // search by name/designation
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z.enum(["createdAt", "updatedAt", "name"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type FacultyListQueryInput = z.infer<typeof FacultyListQuerySchema>;
