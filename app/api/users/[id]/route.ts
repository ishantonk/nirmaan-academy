import { NextRequest, NextResponse } from "next/server";
import {
  deleteUser,
  getUserById,
  updateUser,
  updateUserRole,
} from "@/lib/services";
import { authGuard } from "@/lib/auth";
import { UserRoleEnum } from "@/lib/validators";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await getUserById(params.id);
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
  const updated = await updateUser({ id: params.id, ...body });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(_request); // Protected
  const result = await deleteUser(params.id);
  return NextResponse.json(result);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(request); // Protected
  const { image, role } = await request.json();
  if (role && UserRoleEnum.safeParse(role).success) {
    const updated = await updateUserRole(params.id, role);
    return NextResponse.json(updated);
  }
  if (typeof image === "string") {
    const updated = await updateUser({ id: params.id, image: image });
    return NextResponse.json(updated);
  }
  return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
}
