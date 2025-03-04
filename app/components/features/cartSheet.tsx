"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

export default function CartSheet() {
    return (
        <Sheet>
            <SheetTrigger>
                <button className="flex flex-col items-center justify-center px-0.5 pb-1 gap-0.5 cursor-pointer w-full hover:text-neutral-500 transition-colors ease-in duration-150">
                    <span>
                        <ShoppingCart />
                    </span>
                    <span>Cart</span>
                </button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Shopping cart</SheetTitle>
                    <SheetDescription>
                        Review your selected items and proceed to checkout when
                        you&apos;re ready.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col justify-center items-center py-4 mx-4">
                    <div className="flex flex-col justify-center items-center text-center">
                        <ShoppingCart className="w-24 h-24 mb-4 text-neutral-200" />
                        <p className="text-lg font-semibold">
                            Your cart is empty
                        </p>
                        <p className="text-sm text-gray-500">
                            Add items to your cart to see them here.
                        </p>
                    </div>
                </div>
                <SheetFooter>
                    <Button className="w-full">Return to shop</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
