import { NextRequest, NextResponse } from "next/server";
import { getAttemptsByCourse } from "@/lib/services";

export async function GET(
  _request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const data = await getAttemptsByCourse(params.courseId);
  if (!data)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}
