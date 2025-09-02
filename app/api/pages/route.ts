import { NextRequest, NextResponse } from "next/server";
import { createPage, listPages } from "@/lib/services";
import { authGuard } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const data = await listPages(params);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  await authGuard(request); // Protected
  const body = await request.json();
  const created = await createPage(body);
  return NextResponse.json(created, { status: 201 });
}
