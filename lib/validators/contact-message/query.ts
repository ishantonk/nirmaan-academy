import { z } from "zod";
import { optionalTrimmedString, optionalCuid } from "../utils";

export const ContactMessageListQuerySchema = z.object({
  q: optionalTrimmedString(191), // search by name, email, or subject
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z
    .enum(["createdAt", "updatedAt", "name", "email"])
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type ContactMessageListQueryInput = z.infer<
  typeof ContactMessageListQuerySchema
>;
