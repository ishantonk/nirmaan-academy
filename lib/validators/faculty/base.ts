import { z } from "zod";
import { nameSchema, optionalTrimmedString } from "../utils";

export const FacultyBaseSchema = z.object({
  name: nameSchema,
  bio: optionalTrimmedString(2000),
  image: optionalTrimmedString(500),
  designation: optionalTrimmedString(191),
});

export type FacultyBaseInput = z.infer<typeof FacultyBaseSchema>;
