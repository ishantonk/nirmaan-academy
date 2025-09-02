import { z } from "zod";
import { optionalTrimmedString, optionalCuid } from "../utils";

export const NoticeListQuerySchema = z.object({
  q: optionalTrimmedString(191), // search by content
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z.enum(["createdAt", "updatedAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export type NoticeListQueryInput = z.infer<typeof NoticeListQuerySchema>;
