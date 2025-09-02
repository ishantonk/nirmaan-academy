import z from "zod";
import { FaqBaseSchema } from "./base";

export const CreateFaqSchema = FaqBaseSchema;

export type CreateFaqInput = z.infer<typeof CreateFaqSchema>;
