import z from "zod";
import { UserBaseSchema } from "./base";

export const CreateUserSchema = UserBaseSchema.extend({
  email: UserBaseSchema.shape.email.refine((val) => !!val, {
    message: "Email is required",
  }),
  password: UserBaseSchema.shape.password.refine((val) => !!val, {
    message: "Password is required",
  }),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
