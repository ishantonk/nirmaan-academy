import { z } from "zod";
import { optionalTrimmedString, normalizeName } from "../utils";

export const FacultyBaseObject = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" })
        .min(2, { message: "Name must be at least 2 characters" })
        .max(120, { message: "Name must be at most 120 characters" }),

    bio: optionalTrimmedString(2000),

    image: z
        .string()
        .url({ message: "Image must be a valid URL" })
        .optional()
        .transform((val) => (val === "" ? undefined : val)),

    designation: optionalTrimmedString(120),
});

export const FacultyBaseSchema = FacultyBaseObject.transform((data) => ({
    ...data,
    name: normalizeName(data.name), // capitalize each word
}));

export type FacultyBaseInput = z.infer<typeof FacultyBaseSchema>;
