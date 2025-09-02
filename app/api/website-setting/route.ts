import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "@/lib/auth";
import { createWebsiteSetting, getWebsiteSetting } from "@/lib/services";

export async function GET(request: NextRequest) {
  const setting = await getWebsiteSetting();
  return NextResponse.json(setting || null);
}

export async function POST(request: NextRequest) {
  await authGuard(request); // Protect route
  const body = await request.json();
  const created = await createWebsiteSetting(body);
  return NextResponse.json(created, { status: 201 });
}
