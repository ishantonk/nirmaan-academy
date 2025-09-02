import { z } from "zod";
import { ReviewBaseSchema } from "./base";

export const UpdateReviewSchema = ReviewBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid Review ID is required" }),
});

export type UpdateReviewInput = z.infer<typeof UpdateReviewSchema>;
