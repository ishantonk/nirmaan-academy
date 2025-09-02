import { NextRequest, NextResponse } from "next/server";
import { getAttemptById, updateAttempt, deleteAttempt } from "@/lib/services";
import { authGuard } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await getAttemptById(params.id);
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
  const updated = await updateAttempt({ id: params.id, ...body });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(request); // Protected
  const result = await deleteAttempt(params.id);
  return NextResponse.json(result);
}
