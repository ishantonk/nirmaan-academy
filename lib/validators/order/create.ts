import z from "zod";
import { OrderBaseSchema } from "./base";

export const CreateOrderSchema = OrderBaseSchema;

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
