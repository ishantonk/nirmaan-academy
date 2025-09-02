import { z } from "zod";
import { nameSchema, optionalTrimmedString, passwordSchema } from "../utils";

export const UserRoleEnum = z.enum(["STUDENT", "ADMIN"]);

export const UserBaseSchema = z.object({
  name: nameSchema,
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email format" })
    .max(255)
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, { message: "Invalid phone number" })
    .optional(),
  emailVerified: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().optional()
  ),
  password: passwordSchema.optional(),
  image: z.string().url({ message: "Image must be a valid URL" }).optional(),
  role: UserRoleEnum.default("STUDENT"),

  bio: optionalTrimmedString(500),
});

export type UserBaseInput = z.infer<typeof UserBaseSchema>;
