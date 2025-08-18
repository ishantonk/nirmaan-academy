import { NextRequest, NextResponse } from "next/server";
import {
    getCategoryById,
    updateCategory,
    deleteCategory,
    setPopular,
    setStatus,
} from "@/lib/services";
import { StatusEnum } from "@/lib/validators";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
    const data = await getCategoryById(params.id);
    if (!data) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    const updated = await updateCategory({ id: params.id, ...body });
    return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
    const result = await deleteCategory(params.id);
    return NextResponse.json(result);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { isPopular, status } = await request.json();
    if (typeof isPopular === "boolean") {
        const updated = await setPopular(params.id, isPopular);
        return NextResponse.json(updated);
    }
    if (status && StatusEnum.safeParse(status).success) {
        const updated = await setStatus(params.id, status);
        return NextResponse.json(updated);
    }
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
}
