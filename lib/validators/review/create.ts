import z from "zod";
import { ReviewBaseSchema } from "./base";

export const CreateReviewSchema = ReviewBaseSchema;

export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
