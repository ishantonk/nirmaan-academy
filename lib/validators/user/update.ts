import { z } from "zod";
import { UserBaseSchema } from "./base";

export const UpdateUserSchema = UserBaseSchema.partial().extend({
    id: z.string().cuid({ message: "Valid User id is required" }),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
