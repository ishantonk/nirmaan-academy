import { z } from "zod";
import { OrderBaseSchema } from "./base";

export const UpdateOrderSchema = OrderBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid Order ID is required" }),
});

export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;
