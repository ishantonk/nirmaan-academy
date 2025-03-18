"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { ShoppingCart, User, Settings, LogOut, LayoutDashboard, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/components/mode-toggle"
import type { Session } from "next-auth"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  session: Session | null
  status: "authenticated" | "loading" | "unauthenticated"
  items: {
    title: string
    href: string
    icon?: React.ElementType
    description?: string
  }[]
}

export function MobileNav({ session, status, items }: MobileNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <ScrollArea className="my-4 h-[calc(100vh-4rem)] pt-6 pb-10 px-4">
      <div className="flex flex-col space-y-3">
        {items.map((item) => (
          <Button className={cn(pathname === item.href ? "text-primary" : "text-muted-foreground", "w-full justify-start")} variant="ghost" asChild key={item.title} onClick={() => router.push(item.href)}>
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              {item.icon && (
                <item.icon className={cn(pathname === item.href ? "text-primary" : "text-muted-foreground", "w-4 h-4 mr-2 group-hover:text-primary")} />
              )}
              {item.title}
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

