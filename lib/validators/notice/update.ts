import { z } from "zod";
import { NoticeBaseSchema } from "./base";

export const UpdateNoticeSchema = NoticeBaseSchema.partial().extend({
  id: z.string().cuid({ message: "Valid Notice ID is required" }),
});

export type UpdateNoticeInput = z.infer<typeof UpdateNoticeSchema>;
