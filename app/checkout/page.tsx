import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/format"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export default async function CheckoutPage() {
  const session = await getAuthSession()

  if (!session) {
    redirect("/login?callbackUrl=/checkout")
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: {
        include: {
          category: true,
        },
      },
    },
  })

  if (cartItems.length === 0) {
    redirect("/courses")
  }

  const subtotal = cartItems.reduce((total, item) => total + Number(item.course.price), 0)

  return (
    <div className="container py-8 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="rounded-lg border p-4">
            <ul className="divide-y">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.course.title}</p>
                      <p className="text-sm text-muted-foreground">{item.course.category?.name || "Uncategorized"}</p>
                    </div>
                    <p className="font-medium">{formatPrice(Number(item.course.price))}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <CheckoutForm amount={subtotal} />
        </div>
      </div>
    </div>
  )
}

