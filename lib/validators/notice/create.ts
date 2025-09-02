import z from "zod";
import { NoticeBaseSchema } from "./base";

export const CreateNoticeSchema = NoticeBaseSchema;

export type CreateNoticeInput = z.infer<typeof CreateNoticeSchema>;
