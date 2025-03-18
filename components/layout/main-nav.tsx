"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items: {
    title: string
    href: string
    icon?: React.ElementType
    description?: string
  }[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex gap-6 w-full justify-center">
      {items?.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
            item.icon && "group"
          )}
        >
          {item.icon && (
            <item.icon className={cn(pathname === item.href ? "text-primary" : "text-muted-foreground", "w-4 h-4 mr-2 group-hover:text-primary")} />
          )}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

