import { z } from "zod";
import { StatusEnum } from "../utils";

export const NoticeBaseSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Content is required" })
    .max(300, { message: "Content must be at most 300 characters" }),

  status: StatusEnum.default("ACTIVE"),
});

export type NoticeBaseInput = z.infer<typeof NoticeBaseSchema>;
