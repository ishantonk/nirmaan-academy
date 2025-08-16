import { z } from "zod";
import { decimalSchema } from "../utils";

export const AttemptBaseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "Title is required" })
        .max(191, { message: "Title must be at most 191 characters" }),

    downloadPrice: decimalSchema(0),
    downloadDiscountPrice: z
        .union([z.string(), z.number()])
        .transform((val) => (val === "" ? undefined : Number(val)))
        .refine((val) => val === undefined || val >= 0, {
            message: "Discount price must be >= 0",
        })
        .optional(),

    pendrivePrice: decimalSchema(0),
    pendriveDiscountPrice: z
        .union([z.string(), z.number()])
        .transform((val) => (val === "" ? undefined : Number(val)))
        .refine((val) => val === undefined || val >= 0, {
            message: "Discount price must be >= 0",
        })
        .optional(),

    courseId: z.string().cuid({ message: "Valid course ID is required" }),
});

export type AttemptBaseInput = z.infer<typeof AttemptBaseSchema>;
