import { z } from "zod";
import { FacultyBaseSchema } from "./base";

export const UpdateFacultySchema = FacultyBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid Faculty id is required" }),
});

export type UpdateFacultyInput = z.infer<typeof UpdateFacultySchema>;
