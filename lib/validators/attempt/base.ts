import { z } from "zod";
import { decimalSchema, titleSchema } from "../utils";

export const AttemptBaseSchema = z.object({
  title: titleSchema,

  downloadPrice: decimalSchema(0),
  downloadDiscountPrice: z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" ? undefined : Number(val)))
    .optional(),

  pendrivePrice: decimalSchema(0),
  pendriveDiscountPrice: z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" ? undefined : Number(val)))
    .optional(),

  courseId: z.string().cuid({ message: "Valid course ID is required" }),
});

export type AttemptBaseInput = z.infer<typeof AttemptBaseSchema>;
