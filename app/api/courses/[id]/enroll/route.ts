import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serializePrismaObject } from "@/lib/utils";

import { NextResponse } from "next/server";

export async function POST(req: Request, courseId: string) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const enrollment = await prisma.enrollment.create({
            data: {
                userId: session.user.id,
                courseId: courseId,
                ...body,
            },
        });

        return NextResponse.json(serializePrismaObject(enrollment));
    } catch (error) {
        console.error("[COURSE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
