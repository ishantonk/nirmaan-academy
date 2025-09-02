import { z } from "zod";
import { optionalTrimmedString, optionalCuid } from "../utils";

export const OrderListQuerySchema = z.object({
  q: optionalTrimmedString(191), // search by name, email, phone
  cursor: optionalCuid,
  take: z.number().int().min(1).max(100).default(20),
  orderBy: z.enum(["createdAt", "updatedAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),

  status: z
    .enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"])
    .optional(),
  paymentStatus: z.enum(["UNPAID", "PAID", "FAILED"]).optional(),
});

export type OrderListQueryInput = z.infer<typeof OrderListQuerySchema>;
