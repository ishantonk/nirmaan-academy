import { NextResponse } from "next/server"
import { z } from "zod"
import Razorpay from "razorpay"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const checkoutSchema = z.object({
  amount: z.number().positive(),
  name: z.string().min(2),
  email: z.string().email(),
})

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const body = checkoutSchema.parse(json)

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        course: true,
      },
    })

    if (cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => total + Number(item.course.price), 0)

    // Verify amount matches cart total
    if (totalAmount !== body.amount) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 })
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Convert to smallest currency unit (paise)
      currency: "INR",
      receipt: `order_${Date.now()}`,
    })

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        amount: totalAmount,
        status: "PENDING",
        razorpayOrderId: razorpayOrder.id,
        orderItems: {
          create: cartItems.map((item) => ({
            courseId: item.course.id,
            price: item.course.price,
          })),
        },
      },
    })

    return NextResponse.json({
      id: order.id,
      amount: razorpayOrder.amount,
      razorpayOrderId: razorpayOrder.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

