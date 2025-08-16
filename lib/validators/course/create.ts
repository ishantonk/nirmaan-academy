import { z } from "zod";
import { CourseBaseSchema } from "./base";

export const CreateCourseSchema = CourseBaseSchema;
export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;
