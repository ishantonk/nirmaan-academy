import { NextRequest, NextResponse } from "next/server";
import { createCategory, listCategories } from "@/lib/services";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());
    // coerce booleans/numbers if present
    const input = {
        ...params,
        take: params.take ? Number(params.take) : undefined,
        isPopular: params.isPopular ? params.isPopular === "true" : undefined,
    };
    const data = await listCategories(input);
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const created = await createCategory(body);
    return NextResponse.json(created, { status: 201 });
}
