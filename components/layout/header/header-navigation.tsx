"use client";

import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/site-data";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import React from "react";

export default function HeaderNavigation() {
    return (
        <NavigationMenu className="py-1">
            <NavigationMenuList>
                {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                        {item.items ? (
                            <>
                                <NavigationMenuTrigger
                                    className={
                                        navigationMenuTriggerStyle() +
                                        cn(
                                            "group inline-flex flex-row h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 space-x-2"
                                        )
                                    }
                                >
                                    {item.icon && (
                                        <item.icon className="w-4 h-4 text-primary" />
                                    )}
                                    {item.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="absolute bg-background/95 shadow-lg rounded-lg border translate-y-11">
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {item.items.map((subItem) => (
                                            <ListItem
                                                key={subItem.title}
                                                title={subItem.title}
                                                href={subItem.href}
                                            >
                                                {subItem.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <NavigationMenuLink
                                className="bg-transparent"
                                asChild
                            >
                                <Link
                                    href={item.href!}
                                    className={
                                        navigationMenuTriggerStyle() +
                                        cn(
                                            "group inline-flex flex-row h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                                        )
                                    }
                                >
                                    {item.icon && (
                                        <item.icon className="w-4 h-4 text-primary" />
                                    )}
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-site-secondary/70">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
