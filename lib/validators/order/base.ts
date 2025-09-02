import { z } from "zod";
import {
  decimalSchema,
  nameSchema,
  optionalCuid,
  optionalTrimmedString,
} from "../utils";
import { StudyMaterialEnum } from "../course/base";

/** Keep these in sync with your Prisma enum */
export const PaymentStatusEnum = z.enum(["UNPAID", "PAID", "FAILED"]);
export const OrderStatusEnum = z.enum([
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
]);

const OrderItemSchema = z.object({
  price: decimalSchema(0),
  orderType: StudyMaterialEnum.default("PENDRIVE"),

  // Foreign Keys
  orderId: optionalCuid,
  courseId: z.string().cuid({ message: "Valid Course ID is required" }),
  attemptId: z.string().cuid({ message: "Valid Attempt ID is required" }),
});

export const OrderBaseSchema = z.object({
  name: nameSchema,
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be at most 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Phone must have at least 8 digits" })
    .max(20, { message: "Phone must be at most 20 digits" }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Address is required" })
    .max(500, { message: "Address must be at most 500 characters" }),
  totalAmount: decimalSchema(0),
  subtotalAmount: decimalSchema(0),

  paymentStatus: PaymentStatusEnum.default("UNPAID"),
  status: OrderStatusEnum.default("PENDING"),

  paymentId: optionalTrimmedString(191),
  razorpayOrderId: optionalTrimmedString(191),

  orderItems: z.array(OrderItemSchema).nonempty({
    message: "At least one order item is required",
  }),

  userId: z.string().cuid({ message: "Valid User ID is required" }),
});

export type OrderBaseInput = z.infer<typeof OrderBaseSchema>;
