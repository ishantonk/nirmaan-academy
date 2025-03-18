import { NextResponse } from "next/server"
import { z } from "zod"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const courseUpdateSchema = z.object({
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  featured: z.boolean().optional(),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(req: Request, { params }: { params: any }) {
  try {
    const session = await getAuthSession()

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const body = courseUpdateSchema.parse(json)

    const course = await prisma.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.featured !== undefined && { featured: body.featured }),
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

