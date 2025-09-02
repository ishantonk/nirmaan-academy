import { NextRequest, NextResponse } from "next/server";
import {
  deleteCourse,
  getCourseById,
  setOnSaleCourse,
  setPriorityCourse,
  setStatusCourse,
  setTrendingCourse,
  updateCourse,
} from "@/lib/services";
import { authGuard } from "@/lib/auth";
import { CourseStatusEnum } from "@/lib/validators";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await getCourseById(params.id);
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
  const updated = await updateCourse({ id: params.id, ...body });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(_request); // Protected
  const result = await deleteCourse(params.id);
  return NextResponse.json(result);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(request); // Protected
  const { isTrending, status, onSale, priority } = await request.json();
  if (typeof isTrending === "boolean") {
    const updated = await setTrendingCourse(params.id, isTrending);
    return NextResponse.json(updated);
  }
  if (status && CourseStatusEnum.safeParse(status).success) {
    const updated = await setStatusCourse(params.id, status);
    return NextResponse.json(updated);
  }
  if (typeof onSale === "boolean") {
    const updated = await setOnSaleCourse(params.id, onSale);
    return NextResponse.json(updated);
  }
  if (typeof priority === "number") {
    const updated = await setPriorityCourse(params.id, priority);
    return NextResponse.json(updated);
  }
  return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
}
