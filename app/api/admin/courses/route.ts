import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const ITEMS_PER_PAGE = 10

export async function GET(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const page = Number.parseInt(url.searchParams.get("page") || "0")

    const totalCourses = await prisma.course.count()
    const totalPages = Math.ceil(totalCourses / ITEMS_PER_PAGE)

    const courses = await prisma.course.findMany({
      skip: page * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        instructor: {
          select: {
            name: true,
          },
        },
        category: true,
      },
    })

    return NextResponse.json({
      courses,
      totalPages,
      currentPage: page,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

