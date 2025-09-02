import { NextRequest, NextResponse } from "next/server";
import {
  deleteEbook,
  deleteFaculty,
  getEbookById,
  getFacultyById,
  setStatusEbook,
  updateEbook,
  updateFaculty,
} from "@/lib/services";
import { authGuard } from "@/lib/auth";
import { StatusEnum } from "@/lib/validators";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await getFacultyById(params.id);
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
  const updated = await updateFaculty({ id: params.id, ...body });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(_request); // Protected
  const result = await deleteFaculty(params.id);
  return NextResponse.json(result);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(request); // Protected
  const { image, designation } = await request.json();
  const payload: { id: string; image?: string; designation?: string } = { id: params.id };
  let valid = false;

  if (typeof image === "string") {
    payload.image = image;
    valid = true;
  }
  if (typeof designation === "string") {
    payload.designation = designation;
    valid = true;
  }

  if (valid) {
    const updated = await updateFaculty(payload);
    return NextResponse.json(updated);
  }
  return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
}
