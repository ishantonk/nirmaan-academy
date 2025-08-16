import { z } from "zod";
import { AttemptBaseSchema } from "./base";
import { addCustomIssue } from "../utils";

export const CreateAttemptSchema = AttemptBaseSchema.superRefine(
    (data, ctx) => {
        if (
            data.downloadDiscountPrice !== undefined &&
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
            data.pendriveDiscountPrice > data.pendrivePrice
        ) {
            addCustomIssue(
                ctx,
                ["pendriveDiscountPrice"],
                "Discount price cannot be greater than pendrive price"
            );
        }
    }
);

export type CreateAttemptInput = z.infer<typeof CreateAttemptSchema>;
