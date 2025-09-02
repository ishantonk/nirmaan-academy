import z from "zod";
import { TestimonialBaseSchema } from "./base";

export const CreateTestimonialSchema = TestimonialBaseSchema;

export type CreateTestimonialInput = z.infer<typeof CreateTestimonialSchema>;
