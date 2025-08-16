import { z } from "zod";
import { UserBaseSchema } from "./base";

export const CreateUserSchema = UserBaseSchema.extend({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Email is required"),
    password: z.string().min(6, "Password is required"),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
