import { z } from "zod";
import { FacultyBaseObject } from "./base";

export const UpdateFacultySchema = FacultyBaseObject.partial().extend({
    id: z.string().cuid({ message: "Valid Faculty id is required" }),
});

export type UpdateFacultyInput = z.infer<typeof UpdateFacultySchema>;
