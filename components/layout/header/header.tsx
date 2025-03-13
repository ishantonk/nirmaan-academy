"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import HeaderLogo from "./header-logo";
import HeaderSearch from "./header-search";
import HeaderNavigation from "./header-navigation";
import HeaderActions from "./header-actions";
import MobileNavigation from "./mobile-navigation";
import Container from "@/components/ui/container";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileActions from "./mobile-actions";

export function Header() {
    // State to track whether the user has scrolled
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Function to check scroll position and update state
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        // Debounced version of handleScroll to improve performance
        const debouncedHandleScroll = debounce(handleScroll, 100);

        // Attach event listener for scroll events
        window.addEventListener("scroll", debouncedHandleScroll);

        // Cleanup event listener on component unmount
        return () =>
            window.removeEventListener("scroll", debouncedHandleScroll);
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90",
                isScrolled && "shadow-sm" // Apply shadow when scrolled
            )}
        >
            <Container className="flex items-center">
                {/* Mobile navigation menu */}
                {useIsMobile() && <MobileNavigation />}
                {/* Logo section */}
                <HeaderLogo
                    className="ml-4 md:ml-0"
                    size={useIsMobile() ? "sm" : isScrolled ? "sm" : "md"}
                />
                {useIsMobile() ? (
                    <MobileActions />
                ) : (
                    <>
                        {/* Search bar*/}
                        <HeaderSearch />
                        {/* Actions (e.g., user profile, cart, notifications) */}
                        <HeaderActions />
                    </>
                )}
            </Container>

            <Container className="flex items-center justify-center">
                {/* Main navigation links or search bar */}
                {useIsMobile() ? <HeaderSearch /> : <HeaderNavigation />}
            </Container>
        </header>
    );
}

// Utility function for debouncing events to optimize performance
function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
