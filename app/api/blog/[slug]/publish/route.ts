import { NextRequest, NextResponse } from "next/server";
import { publishBlogPost } from "@/lib/services";
import { authGuard } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  await authGuard(request); // Ensure user is authenticated

  const updated = await publishBlogPost(params.slug);
  return NextResponse.json(updated);
}
