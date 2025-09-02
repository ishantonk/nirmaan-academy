import { z } from "zod";
import { FaqBaseSchema } from "./base";

export const UpdateFaqSchema = FaqBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid FAQ ID is required" }),
});

export type UpdateFaqInput = z.infer<typeof UpdateFaqSchema>;
