import { NextResponse } from "next/server"
import { z } from "zod"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const reviewSchema = z.object({
  courseId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const body = reviewSchema.parse(json)

    // Check if user is enrolled in the course
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        courseId: body.courseId,
      },
    })

    if (!enrollment) {
      return NextResponse.json({ error: "You must be enrolled in the course to leave a review" }, { status: 403 })
    }

    // Check if user has already reviewed this course
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: body.courseId,
        },
      },
    })

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this course" }, { status: 400 })
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        courseId: body.courseId,
        rating: body.rating,
        comment: body.comment,
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

