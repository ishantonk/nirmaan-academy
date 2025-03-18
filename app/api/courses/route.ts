import { NextResponse } from "next/server"
import * as z from "zod"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"

const courseSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  price: z.number().min(0),
  categoryId: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "INSTRUCTOR" && session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { title, description, price, categoryId } = courseSchema.parse(body)

    // Generate a unique slug
    const slug = slugify(title)

    // Check if slug already exists
    const existingCourse = await prisma.course.findUnique({
      where: {
        slug,
      },
    })

    // If slug exists, append a random string
    const finalSlug = existingCourse ? `${slug}-${Math.random().toString(36).substring(2, 7)}` : slug

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        slug: finalSlug,
        categoryId,
        instructorId: session.user.id,
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request data", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

