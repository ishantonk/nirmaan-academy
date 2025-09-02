import { NextRequest, NextResponse } from "next/server";
import { deleteContactMessage, getContactMessageById } from "@/lib/services";
import { authGuard } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await getContactMessageById(params.id);
  if (!data)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(_request); // Protected
  const result = await deleteContactMessage(params.id);
  return NextResponse.json(result);
}
