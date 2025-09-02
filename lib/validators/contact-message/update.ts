import { z } from "zod";
import { ContactMessageBaseSchema } from "./base";

export const UpdateContactMessageSchema =
  ContactMessageBaseSchema.partial().extend({
    id: z.string().cuid({ message: "Valid ContactMessage ID is required" }),
  });

export type UpdateContactMessageInput = z.infer<
  typeof UpdateContactMessageSchema
>;
