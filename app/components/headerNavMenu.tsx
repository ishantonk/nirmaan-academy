"use client";

import * as React from "react";
import Link from "next/link";
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
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Menu components.
const menuComponents: {
    title: string;
    url: string;
    icon: React.ComponentType<{ size: number }>;
}[] = [
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
        title: "PDF Lessons",
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

// courses list
const coursesList: { title: string; url: string; description: string }[] = [
    {
        title: "All Courses",
        url: "/courses",
        description: "Browse all courses.",
    },
    {
        title: "Physics",
        url: "/courses/physics",
        description: "Learn Physics from the best teachers.",
    },
    {
        title: "Chemistry",
        url: "/courses/chemistry",
        description: "Learn Chemistry from the best teachers.",
    },
    {
        title: "Mathematics",
        url: "/courses/mathematics",
        description: "Learn Mathematics from the best teachers.",
    },
    {
        title: "Biology",
        url: "/courses/biology",
        description: "Learn Biology from the best teachers.",
    },
];

// PDF lessons list
const pdfLessonsList: { title: string; url: string; description: string }[] = [
    {
        title: "All PDF Lessons",
        url: "/pdf-lessons",
        description: "Browse all PDF lessons.",
    },
    {
        title: "Physics",
        url: "/pdf-lessons/physics",
        description: "Download Physics PDF lessons.",
    },
    {
        title: "Chemistry",
        url: "/pdf-lessons/chemistry",
        description: "Download Chemistry PDF lessons.",
    },
    {
        title: "Mathematics",
        url: "/pdf-lessons/mathematics",
        description: "Download Mathematics PDF lessons.",
    },
    {
        title: "Biology",
        url: "/pdf-lessons/biology",
        description: "Download Biology PDF lessons.",
    },
];

export function HeaderNavMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="text-site-primary hover:text-site-secondary">
                {
                    // Render menu items.
                    menuComponents.map((component) => {
                        if (
                            component.title !== "Video Lessons" &&
                            component.title !== "PDF Lessons"
                        ) {
                            return (
                                <NavigationMenuItem
                                    className="text-site-primary hover:text-site-secondary"
                                    key={component.title}
                                >
                                    <Link href={component.url} passHref>
                                        <NavigationMenuLink
                                            className={
                                                navigationMenuTriggerStyle() +
                                                " text-site-primary hover:text-site-secondary hover:bg-site-primary/5"
                                            }
                                        >
                                            {component.title}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            );
                        } else if (component.title === "Video Lessons") {
                            return (
                                <NavigationMenuItem key={component.title}>
                                    <NavigationMenuTrigger
                                        className={
                                            navigationMenuTriggerStyle() +
                                            " text-site-primary hover:text-site-secondary hover:bg-site-primary/5"
                                        }
                                    >
                                        {component.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {coursesList.map((course) => (
                                                <ListItem
                                                    className="text-site-primary hover:text-site-secondary hover:bg-site-primary/5"
                                                    key={course.title}
                                                    title={course.title}
                                                    href={course.url}
                                                >
                                                    {course.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            );
                        } else {
                            return (
                                <NavigationMenuItem key={component.title}>
                                    <NavigationMenuTrigger
                                        className={
                                            navigationMenuTriggerStyle() +
                                            " text-site-primary hover:text-site-secondary hover:bg-site-primary/5"
                                        }
                                    >
                                        {component.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {pdfLessonsList.map((pdfLesson) => (
                                                <ListItem
                                                    className="text-site-primary hover:text-site-secondary hover:bg-site-primary/5"
                                                    key={pdfLesson.title}
                                                    title={pdfLesson.title}
                                                    href={pdfLesson.url}
                                                >
                                                    {pdfLesson.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            );
                        }
                    })
                }
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
