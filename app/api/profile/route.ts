import { NextResponse } from "next/server"
import * as z from "zod"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const profileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
})

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, bio, image } = profileSchema.parse(body)

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        bio,
        image,
      },
    })

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        bio: updatedUser.bio,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request data", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

