import { z } from "zod";
import { CourseBaseSchema } from "./base";

export const UpdateCourseSchema = CourseBaseSchema.partial().extend({
    id: z.string().cuid({ message: "Valid Course ID is required" }),
});
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>;
