import { NextRequest, NextResponse } from "next/server";
import {
  getBlogPostBySlug,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/services";
import { authGuard } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const data = await getBlogPostBySlug(params.slug);
  if (!data)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  await authGuard(request); // Protected
  const body = await request.json();
  const updated = await updateBlogPost({ slug: params.slug, ...body });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  await authGuard(request); // Protected
  const result = await deleteBlogPost(params.slug);
  return NextResponse.json(result);
}
