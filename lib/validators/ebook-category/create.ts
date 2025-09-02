import { z } from "zod";
import { EbookCategoryBaseSchema } from "./base";

export const CreateEbookCategorySchema = EbookCategoryBaseSchema;

export type CreateEbookCategoryInput = z.infer<
  typeof CreateEbookCategorySchema
>;
