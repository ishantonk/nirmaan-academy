"use client";

import {
    FileChartLine,
    Home,
    MonitorPlay,
    NotebookPen,
    GraduationCap,
    Rss,
    MessageSquareWarning,
    LifeBuoy,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "./searchBox";
import { useIsMobile } from "@/hooks/use-mobile";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Video Lessons",
        url: "/courses",
        icon: MonitorPlay,
    },
    {
        title: "Free PDF Lessons",
        url: "#",
        icon: FileChartLine,
    },
    {
        title: "Test series",
        url: "#",
        icon: NotebookPen,
    },
    {
        title: "Faculty",
        url: "/faculty",
        icon: GraduationCap,
    },
    {
        title: "Blog",
        url: "/blogs",
        icon: Rss,
    },
    {
        title: "About Us",
        url: "/about",
        icon: MessageSquareWarning,
    },
    {
        title: "Contact and Support",
        url: "/contact",
        icon: LifeBuoy,
    },
];

export function Header() {
    const { toggleSidebar } = useSidebar();

    return (
        <header>
            {/* Main header */}
            <div className="py-4 border-b">
                <div className="container mx-auto px-4 flex flex-row justify-between items-center">
                    {/* Menu button (mobile) */}
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden flex items-center space-x-2"
                    >
                        <Menu className="h-6 w-6 text-site-primary" />
                    </button>

                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="relative">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <span className="text-lg font-medium text-site-primary">
                                Nirmaan Academy
                            </span>
                        </Link>
                    </div>

                    {
                        /* Search box on large screen */
                        !useIsMobile() ? (
                            <div className="flex-grow mx-8 px-8">
                                <SearchBox />
                            </div>
                        ) : null
                    }

                    <div className="flex justify-center items-center space-x-4">
                        {/* Cart */}
                        <Link href="/cart" className="relative">
                            <ShoppingCart className="h-6 w-6 text-site-primary" />
                            <span className="absolute -top-2 -right-2 bg-site-accent text-site-primary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                0
                            </span>
                        </Link>

                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className="relative hidden lg:flex"
                        >
                            <Heart className="h-6 w-6 text-site-primary" />
                            <span className="absolute -top-2 -right-2 bg-site-accent text-site-primary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                0
                            </span>
                        </Link>

                        {/* User profile */}
                        <Link
                            href="/wishlist"
                            className="relative hidden lg:flex"
                        >
                            <User className="h-6 w-6 text-site-primary" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex flex-row justify-center items-center w-full bg-site-primary px-2 py-2.5">
                <div className="flex flex-row items-center justify-center space-x-6">
                    {items.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            className="flex flex-row justify-center items-center text-sm text-site-accent space-x-1"
                        >
                            <item.icon size={20} />
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Search bar for mobile */}

            {useIsMobile() ? (
                <div className="py-4 border-b">
                    <SearchBox />
                </div>
            ) : null}
        </header>
    );
}
