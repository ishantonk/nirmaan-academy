import { NextResponse } from "next/server"
import { z } from "zod"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const progressSchema = z.object({
  lessonId: z.string(),
  enrollmentId: z.string(),
  completed: z.boolean(),
})

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const body = progressSchema.parse(json)

    // Verify enrollment belongs to user
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        id: body.enrollmentId,
      },
    })

    if (!enrollment || enrollment.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Upsert progress
    const progress = await prisma.progress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: body.enrollmentId,
          lessonId: body.lessonId,
        },
      },
      update: {
        completed: body.completed,
        completedAt: body.completed ? new Date() : null,
      },
      create: {
        enrollmentId: body.enrollmentId,
        lessonId: body.lessonId,
        completed: body.completed,
        completedAt: body.completed ? new Date() : null,
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

