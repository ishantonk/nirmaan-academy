"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    BookOpen,
    FileChartLine,
    GraduationCap,
    Home,
    LifeBuoy,
    MessageSquareWarning,
    Newspaper,
    NotebookPen,
    Search,
    ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { APP_ROUTES } from "@/data/routes-names";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "@/components/layout/header/desktop-nav";
import { MobileNav } from "@/components/layout/header/mobile-nav";
import { UserNav } from "@/components/layout/header/user-nav";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
    // State to track whether the user has scrolled
    const [isScrolled, setIsScrolled] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
                isScrolled && "drop-shadow-sm"
            )}
        >
            <div className="mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {
                            /* Mobile menu */
                            isMobile && <MobileNav items={navItems} />
                        }
                        <Logo
                            size={isMobile ? "sm" : isScrolled ? "sm" : "md"}
                        />
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="hidden md:flex"
                            >
                                <Link href="/search">
                                    <Search className="h-4 w-4" />
                                    <span className="sr-only">Search</span>
                                </Link>
                            </Button>
                        </div>
                        <Link href="/cart">
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Shopping Cart</span>
                            </Button>
                        </Link>
                        {!isMobile && <ModeToggle /> /* Dark Mode Toggle */}
                        <UserNav /> {/* User Navigation */}
                    </div>
                </div>

                {
                    /* Navigation for desktop */
                    !isMobile && <DesktopNav items={navItems} />
                }
            </div>
        </header>
    );
}

const navItems: {
    title: string;
    href: string;
    icon?: React.ElementType;
    description?: string;
}[] = [
    {
        title: "Home",
        href: APP_ROUTES.home,
        icon: Home,
    },
    {
        title: "Courses",
        href: APP_ROUTES.courses,
        icon: BookOpen,
    },
    {
        title: "PDF",
        href: "#",
        icon: FileChartLine,
    },
    {
        title: "Test Series",
        href: "#",
        icon: NotebookPen,
    },
    {
        title: "Instructors",
        href: APP_ROUTES.instructors,
        icon: GraduationCap,
    },
    {
        title: "Blog",
        href: APP_ROUTES.blogs,
        icon: Newspaper,
    },
    {
        title: "About",
        href: APP_ROUTES.aboutUs,
        icon: MessageSquareWarning,
    },
    {
        title: "Contact",
        href: APP_ROUTES.contact,
        icon: LifeBuoy,
    },
];
