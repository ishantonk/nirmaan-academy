"use client";

import { Heart } from "lucide-react";
import Container from "../components/container";

export default function WishlistPage() {
    return (
        <main>
            <Container>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                            Wishlist
                        </h2>
                        <p className="mt-2 text-lg/8 text-gray-600">
                            Your Personalized Wishlist: Keep Track of Your
                            Favorite Items and Plans.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-1 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col justify-center items-center mx-4 lg:col-span-3">
                            <div className="flex flex-col justify-center items-center text-center">
                                <Heart className="w-60 h-60 mb-4 text-neutral-200" />
                                <p className="text-lg font-semibold">
                                    Your wishlist is empty
                                </p>
                                <p className="text-sm text-gray-500">
                                    Add items to your wishlist to see them here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
