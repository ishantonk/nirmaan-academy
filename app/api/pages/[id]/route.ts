import { NextRequest, NextResponse } from "next/server";
import {
  deletePage,
  getPageById,
  updatePage,
  updateStatusOrder,
} from "@/lib/services";
import { authGuard } from "@/lib/auth";
import { StatusEnum } from "@/lib/validators";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await getPageById(params.id);
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
  const updated = await updatePage({ id: params.id, ...body });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(_request); // Protected
  const result = await deletePage(params.id);
  return NextResponse.json(result);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(request); // Protected
  const { status } = await request.json();
  if (status && StatusEnum.safeParse(status).success) {
    const updated = await updateStatusOrder(params.id, status);
    return NextResponse.json(updated);
  }
  return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
}
