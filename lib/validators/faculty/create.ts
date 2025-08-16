import { z } from "zod";
import { FacultyBaseSchema } from "./base";

export const CreateFacultySchema = FacultyBaseSchema;

export type CreateFacultyInput = z.infer<typeof CreateFacultySchema>;
