import { NextRequest, NextResponse } from "next/server";
import { updateWebsiteSetting } from "@/lib/services";
import { authGuard } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  await authGuard(request);
  const body = await request.json();
  const updated = await updateWebsiteSetting(body);
  return NextResponse.json(updated, { status: 200 });
}
