import { z } from "zod";
import { EbookBaseSchema } from "./base";

export const CreateEbookSchema = EbookBaseSchema;

export type CreateEbookInput = z.infer<typeof CreateEbookSchema>;
