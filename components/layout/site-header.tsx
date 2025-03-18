"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { UserNav } from "@/components/layout/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { BookOpen, FileChartLine, GraduationCap, Home, LifeBuoy, Menu, MessageSquareWarning, Newspaper, NotebookPen, Search, ShoppingCart } from "lucide-react"
import { Logo } from "@/components/logo"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSession } from "next-auth/react"

const mainNavItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Courses",
    href: "/courses",
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
    href: "/instructors",
    icon: GraduationCap,
  },
  {
    title: "Blog",
    href: "/blogs",
    icon: Newspaper,
  },
  {
    title: "About",
    href: "/about",
    icon: MessageSquareWarning,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: LifeBuoy,
  },
]

export function SiteHeader() {
  // State to track whether the user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300", isScrolled && "shadow-sm")}>
      <div className="mx-auto">
        <div className="container flex items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-6 md:gap-10">
            {
              isMobile ? (
                <>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pl-0">
                      <SheetHeader className="hidden md:block">
                        <SheetTitle className="sr-only">Toggle Menu</SheetTitle>
                      </SheetHeader>
                      <MobileNav session={session} status={status} items={mainNavItems} />
                    </SheetContent>
                  </Sheet>
                  <Logo size="sm" />
                </>
              ) : (
                <Logo size={isScrolled ? "sm" : "md"} />
              )
            }
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="ghost" size="icon" asChild className="hidden md:flex">
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
            <ModeToggle />
            <UserNav />
          </div>
        </div>
        {
          !isMobile && (
            <div className="hidden md:flex container items-center justify-between py-2 border-t border-primary/10">
              <MainNav items={mainNavItems} />
            </div>
          )
        }
      </div>
    </header>
  )
}
