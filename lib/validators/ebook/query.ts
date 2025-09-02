import { z } from "zod";
import { optionalTrimmedString, optionalCuid, StatusEnum } from "../utils";

export const EbookListQuerySchema = z.object({
  q: optionalTrimmedString(191), // search by name
  status: StatusEnum.optional(),
  categoryId: optionalCuid,
  professorId: optionalCuid,
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z.enum(["createdAt", "updatedAt", "name"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type EbookListQueryInput = z.infer<typeof EbookListQuerySchema>;
