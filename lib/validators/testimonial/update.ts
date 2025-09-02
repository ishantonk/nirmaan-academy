import { z } from "zod";
import { TestimonialBaseSchema } from "./base";

export const UpdateTestimonialSchema = TestimonialBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid Testimonial ID is required" }),
});

export type UpdateTestimonialInput = z.infer<typeof UpdateTestimonialSchema>;
