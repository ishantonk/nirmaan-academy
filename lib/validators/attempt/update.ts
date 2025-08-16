import { z } from "zod";
import { AttemptBaseSchema } from "./base";
import { addCustomIssue } from "../utils";

export const UpdateAttemptSchema = AttemptBaseSchema.partial()
    .extend({
        id: z.string().cuid({ message: "Valid Attempt ID is required" }),
    })
    .superRefine((data, ctx) => {
        if (
            data.downloadDiscountPrice !== undefined &&
            data.downloadPrice !== undefined &&
            data.downloadDiscountPrice > data.downloadPrice
        ) {
            addCustomIssue(
                ctx,
                ["downloadDiscountPrice"],
                "Discount price cannot be greater than download price"
            );
        }

        if (
            data.pendriveDiscountPrice !== undefined &&
            data.pendrivePrice !== undefined &&
            data.pendriveDiscountPrice > data.pendrivePrice
        ) {
            addCustomIssue(
                ctx,
                ["pendriveDiscountPrice"],
                "Discount price cannot be greater than pendrive price"
            );
        }
    });

export type UpdateAttemptInput = z.infer<typeof UpdateAttemptSchema>;
