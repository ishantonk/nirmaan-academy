import { z } from "zod";
import { ReviewBaseSchema } from "./base";

export const CreateReviewSchema = ReviewBaseSchema.extend({
    userId: z.string().cuid({ message: "Valid User ID is required" }),
    courseId: z.string().cuid({ message: "Valid Course ID is required" }),
});

export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
