import z from "zod";
import { PageBaseSchema } from "./base";

export const CreatePageSchema = PageBaseSchema;

export type CreatePageInput = z.infer<typeof CreatePageSchema>;
