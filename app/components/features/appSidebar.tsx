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
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import Link from "next/link";

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

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex flex-row items-center space-x-4 relative">
                            <Image src="/logo.png" alt="Logo" width={56} height={56} />
                            <Label className="text-lg text-site-primary">Nirmaan Academy</Label>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="text-site-primary hover:text-site-secondary">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
