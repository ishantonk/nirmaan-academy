import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(req: Request, { params }: { params: { cartItemId: string } }) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: params.cartItemId,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ message: "Cart item not found" }, { status: 404 })
    }

    if (cartItem.userId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    await prisma.cartItem.delete({
      where: {
        id: params.cartItemId,
      },
    })

    return NextResponse.json({ message: "Cart item removed" })
  } catch {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

