"use client";

import { ShoppingCart } from "lucide-react";
import Container from "../../components/ui/container";
import Heading from "@/components/ui/heading";
import CartList from "@/components/cart/cart-list";

export default function CartPage() {
    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-6 lg:px-8 my-4 space-y-8">
                    <Heading
                        description="Review your selected items and proceed to checkout
                            when you're ready."
                    >
                        Shopping cart
                    </Heading>

                    <CartList />
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-1 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col justify-center items-center mx-4 lg:col-span-3">
                            <div className="flex flex-col justify-center items-center text-center">
                                <ShoppingCart className="w-60 h-60 mb-4 text-neutral-200" />
                                <p className="text-lg font-semibold">
                                    Your cart is empty
                                </p>
                                <p className="text-sm text-gray-500">
                                    Add items to your cart to see them here.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    );
}
