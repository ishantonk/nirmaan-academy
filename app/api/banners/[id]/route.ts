import { NextRequest, NextResponse } from "next/server";
import { getBannerById, updateBanner, deleteBanner } from "@/lib/services";
import { authGuard } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await getBannerById(params.id);
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
  const updated = await updateBanner({ id: params.id, ...body });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await authGuard(request); // Protected
  const result = await deleteBanner(params.id);
  return NextResponse.json(result);
}
