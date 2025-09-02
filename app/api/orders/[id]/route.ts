import { NextRequest, NextResponse } from "next/server";
import {
  deleteNotice,
  deleteOrder,
  getNoticeById,
  getOrderById,
  updateNotice,
  updateOrder,
  updatePaymentStatusOrder,
  updateStatusNotice,
  updateStatusOrder,
} from "@/lib/services";
import { authGuard } from "@/lib/auth";
import { OrderStatusEnum, PaymentStatusEnum } from "@/lib/validators";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await getOrderById(params.id);
  if (!data)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(request); // Protected
  const body = await request.json();
  const updated = await updateOrder({ id: params.id, ...body });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(_request); // Protected
  const result = await deleteOrder(params.id);
  return NextResponse.json(result);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(request); // Protected
  const { paymentStatus, status } = await request.json();
  if (paymentStatus && PaymentStatusEnum.safeParse(paymentStatus).success) {
    const updated = await updatePaymentStatusOrder(params.id, paymentStatus);
    return NextResponse.json(updated);
  }
  if (status && OrderStatusEnum.safeParse(status).success) {
    const updated = await updateStatusOrder(params.id, status);
    return NextResponse.json(updated);
  }
  return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
}
