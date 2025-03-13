"use client";

import { Heart, Store } from "lucide-react";

export default function BottomNavbar() {
    return (
        <div className="flex flex-row items-center justify-center fixed bottom-0 inset-x-0 bg-white">
            <div className="flex flex-row items-center justify-between p-1 pt-2 text-xs text-site-primary w-full">
                <div className="flex flex-col flex-1/4 items-center justify-center">
                    <button className="flex flex-col items-center justify-center px-0.5 pb-1 gap-0.5 cursor-pointer w-full hover:text-site-secondary transition-colors ease-in duration-150">
                        <span>
                            <Store size={24} />
                        </span>
                        <span>Shop</span>
                    </button>
                </div>
                <div className="flex flex-col flex-1/4 items-center justify-center">
                    <button className="flex flex-col items-center justify-center px-0.5 pb-1 gap-0.5 cursor-pointer w-full hover:text-site-secondary transition-colors ease-in duration-150">
                        <span>
                            <Heart />
                        </span>
                        <span>Wishlist</span>
                    </button>
                </div>
                <div className="flex flex-col flex-1/4 items-center justify-center">
                    {/* <CartSheet /> */}
                </div>
                <div className="flex flex-col flex-1/4 items-center justify-center">
                    {/* <AccountSheet /> */}
                </div>
            </div>
        </div>
    );
}
