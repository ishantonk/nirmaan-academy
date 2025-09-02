import z from "zod";
import { ContactMessageBaseSchema } from "./base";

export const CreateContactMessageSchema = ContactMessageBaseSchema;

export type CreateContactMessageInput = z.infer<
  typeof CreateContactMessageSchema
>;
