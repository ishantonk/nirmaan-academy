// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { ShoppingCart } from "lucide-react"
// import { useQuery } from "@tanstack/react-query"
// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { CartItemList } from "@/components/cart/cart-item-list"
// import { Separator } from "@/components/ui/separator"
// import { formatPrice } from "@/lib/format"

// export function CartButton() {
//   const [isOpen, setIsOpen] = useState(false)

//   const { data: cartItems = [], isLoading } = useQuery({
//     queryKey: ["cart"],
//     queryFn: async () => {
//       const response = await fetch("/api/cart")
//       if (!response.ok) {
//         throw new Error("Failed to fetch cart")
//       }
//       return response.json()
//     },
//   })

//   const totalItems = cartItems.length

//   const subtotal = cartItems.reduce((total: number, item: any) => total + Number(item.course.price), 0)

//   return (
//     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//       <SheetTrigger asChild>
//         <Button variant="outline" size="icon" className="relative">
//           <ShoppingCart className="h-5 w-5" />
//           {totalItems > 0 && (
//             <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
//               {totalItems}
//             </span>
//           )}
//         </Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Your Cart ({totalItems})</SheetTitle>
//         </SheetHeader>

//         {isLoading ? (
//           <div className="flex items-center justify-center h-full">
//             <p>Loading cart...</p>
//           </div>
//         ) : totalItems === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full gap-4">
//             <ShoppingCart className="h-12 w-12 text-muted-foreground" />
//             <p className="text-muted-foreground">Your cart is empty</p>
//             <Button asChild variant="outline">
//               <Link href="/courses">Browse Courses</Link>
//             </Button>
//           </div>
//         ) : (
//           <>
//             <div className="flex-1 overflow-y-auto py-4">
//               <CartItemList items={cartItems} />
//             </div>
//             <Separator />
//             <div className="py-4">
//               <div className="flex items-center justify-between">
//                 <span className="font-medium">Subtotal</span>
//                 <span className="font-medium">{formatPrice(subtotal)}</span>
//               </div>
//               <p className="text-sm text-muted-foreground mt-1">Taxes calculated at checkout</p>
//             </div>
//             <SheetFooter>
//               <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
//                 <Link href="/checkout">Checkout</Link>
//               </Button>
//             </SheetFooter>
//           </>
//         )}
//       </SheetContent>
//     </Sheet>
//   )
// }

