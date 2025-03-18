import { NextResponse } from "next/server"
import { z } from "zod"
import crypto from "crypto"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const verifySchema = z.object({
  orderId: z.string(),
  paymentId: z.string(),
  signature: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const body = verifySchema.parse(json)

    // Get order from database
    const order = await prisma.order.findUnique({
      where: {
        id: body.orderId,
      },
      include: {
        orderItems: {
          include: {
            course: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Verify payment signature
    const text = `${order.razorpayOrderId}|${body.paymentId}`
    const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(text).digest("hex")

    if (generatedSignature !== body.signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Update order status
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "COMPLETED",
        paymentId: body.paymentId,
      },
    })

    // Create enrollments for purchased courses
    for (const item of order.orderItems) {
      await prisma.enrollment.create({
        data: {
          userId: session.user.id,
          courseId: item.courseId,
        },
      })
    }

    // Clear user's cart
    await prisma.cartItem.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json({ message: "Payment verified successfully" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

