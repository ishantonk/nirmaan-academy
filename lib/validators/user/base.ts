import { z } from "zod";

export const UserBaseSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(150)
        .optional(),
    email: z.string().email("Invalid email").optional(),
    emailVerified: z.date().optional(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional(),
    image: z.string().url("Invalid image URL").optional(),
    role: z.enum(["STUDENT", "ADMIN"]).default("STUDENT").optional(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
});

export type UserBaseInput = z.infer<typeof UserBaseSchema>;
