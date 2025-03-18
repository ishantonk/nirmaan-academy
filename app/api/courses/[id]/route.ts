import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { serializePrismaObject } from "@/lib/utils"
import { Prisma } from "@prisma/client"

type CourseWithRelations = Prisma.CourseGetPayload<{
  include: {
    category: true
    instructor: {
      select: {
        id: true
        name: true
        image: true
      }
    }
    enrollments: {
      include: {
        user: true
      }
    }
    reviews: true
  }
}>

interface CourseAnalytics {
  enrolledStudents: number
  totalRevenue: number
  averageRating: number
  totalLessons: number
  completionRate: number
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const course = await prisma.course.findUnique({
      where: {
        id: params.id,
        instructorId: session.user.id,
      },
      include: {
        category: true,
        instructor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        enrollments: {
          include: {
            user: true
          }
        },
        reviews: true,
      },
    }) as CourseWithRelations | null

    if (!course) {
      return new NextResponse("Course not found", { status: 404 })
    }

    // Calculate analytics
    const analytics: CourseAnalytics = {
      enrolledStudents: course.enrollments.length,
      totalRevenue: course.enrollments.reduce((sum) => {
        return sum + Number(course.price)
      }, 0),
      averageRating: course.reviews.length > 0
        ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length
        : 0,
      totalLessons: 0, // TODO: Add lessons count when lessons are implemented
      completionRate: course.enrollments.length > 0
        ? (course.enrollments.filter(e => e.completedAt !== null).length / course.enrollments.length) * 100
        : 0,
    }

    const courseWithAnalytics = {
      ...course,
      ...analytics,
    }

    return NextResponse.json(serializePrismaObject(courseWithAnalytics))
  } catch (error) {
    console.error("[COURSE_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const course = await prisma.course.update({
      where: {
        id: params.id,
        instructorId: session.user.id,
      },
      data: {
        ...body,
      },
    })

    return NextResponse.json(serializePrismaObject(course))
  } catch (error) {
    console.error("[COURSE_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const course = await prisma.course.delete({
      where: {
        id: params.id,
        instructorId: session.user.id,
      },
    })

    return NextResponse.json(serializePrismaObject(course))
  } catch (error) {
    console.error("[COURSE_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

