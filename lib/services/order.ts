import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateOrderInput,
  CreateOrderSchema,
  UpdateOrderInput,
  UpdateOrderSchema,
  OrderListQueryInput,
  OrderListQuerySchema,
} from "../validators";

/** Common select shape */
const orderSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
  totalAmount: true,
  subtotalAmount: true,
  paymentStatus: true,
  status: true,
  paymentId: true,
  razorpayOrderId: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  orderItems: {
    select: {
      id: true,
      price: true,
      orderType: true,
      courseId: true,
      attemptId: true,
    },
  },
} satisfies Prisma.OrderSelect;

/** DTO Type */
export type OrderDTO = Prisma.OrderGetPayload<{ select: typeof orderSelect }>;

/** Create Order (with items) */
export async function createOrder(input: unknown): Promise<OrderDTO> {
  const data = parseOrThrow<CreateOrderInput>(CreateOrderSchema, input);

  const created = await prisma.order.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      totalAmount: data.totalAmount,
      subtotalAmount: data.subtotalAmount,
      userId: data.userId,
      orderItems: {
        create: data.orderItems.map((item) => ({
          price: item.price,
          orderType: item.orderType,
          courseId: item.courseId,
          attemptId: item.attemptId,
        })),
      },
    },
    select: orderSelect,
  });

  return created;
}

/** Update Order */
export async function updateOrder(input: unknown): Promise<OrderDTO> {
  const data = parseOrThrow<UpdateOrderInput>(UpdateOrderSchema, input);
  const { id, ...rest } = data;

  try {
    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(rest.name !== undefined && { name: rest.name }),
        ...(rest.email !== undefined && { email: rest.email }),
        ...(rest.phone !== undefined && { phone: rest.phone }),
        ...(rest.address !== undefined && { address: rest.address }),
        ...(rest.status !== undefined && { status: rest.status }),
        ...(rest.paymentStatus !== undefined && {
          paymentStatus: rest.paymentStatus,
        }),
        ...(rest.paymentId !== undefined && { paymentId: rest.paymentId }),
        ...(rest.razorpayOrderId !== undefined && {
          razorpayOrderId: rest.razorpayOrderId,
        }),
        ...(rest.orderItems && {
          orderItems: {
            // Replace all existing items with new ones
            // deleteMany: {}, // delete all existing items
            create: rest.orderItems.map((item) => ({
              price: item.price,
              orderType: item.orderType,
              orderId: item.orderId,
              courseId: item.courseId,
              attemptId: item.attemptId,
            })),
          },
        }),
      },
    });

    // Refetch the order with its items
    const orderWithItems = await prisma.order.findUnique({
      where: { id },
      select: orderSelect,
    });

    return orderWithItems!;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Order not found.");
    }
    throw error;
  }
}

/** Delete Order */
export async function deleteOrder(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.order.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Order not found.");
    }
    throw error;
  }
}

/** Get Order by ID */
export async function getOrderById(id: string): Promise<OrderDTO | null> {
  return prisma.order.findUnique({
    where: { id },
    select: orderSelect,
  });
}

/** List Orders (with filters + pagination) */
export async function listOrders(input: unknown): Promise<{
  items: OrderDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<OrderListQueryInput>(OrderListQuerySchema, input);

  const where: Prisma.OrderWhereInput = {
    ...(params.status && { status: { equals: params.status } }),
    ...(params.paymentStatus && {
      paymentStatus: { equals: params.paymentStatus },
    }),
    ...(params.q && {
      OR: [
        { name: { contains: params.q, mode: "insensitive" } },
        { email: { contains: params.q, mode: "insensitive" } },
        { phone: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.order.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: orderSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Update Payment Status */
export async function updatePaymentStatusOrder(
  id: string,
  paymentStatus: OrderDTO["paymentStatus"]
): Promise<OrderDTO> {
  try {
    return await prisma.order.update({
      where: { id },
      data: { paymentStatus },
      select: orderSelect,
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Order not found.");
    }
    throw error;
  }
}

/** Update Order Status */
export async function updateStatusOrder(
  id: string,
  status: OrderDTO["status"]
): Promise<OrderDTO> {
  try {
    return await prisma.order.update({
      where: { id },
      data: { status },
      select: orderSelect,
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Order not found.");
    }
    throw error;
  }
}
