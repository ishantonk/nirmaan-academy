import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().email({ message: "Valid email required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
