"use client";

import { Bell, Calendar, Clock, Pin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    time?: string;
    category: "announcement" | "event" | "deadline";
    isPinned?: boolean;
}

export function NoticeBoard({
    notices,
    className,
}: {
    notices: Notice[];
    className?: string;
}) {
    const pinnedNotices = notices.filter((notice) => notice.isPinned);
    const regularNotices = notices.filter((notice) => !notice.isPinned);

    const getCategoryStyles = (category: Notice["category"]) => {
        switch (category) {
            case "announcement":
                return "bg-blue-50 border-blue-200 text-blue-700";
            case "event":
                return "bg-green-50 border-green-200 text-green-700";
            case "deadline":
                return "bg-red-50 border-red-200 text-red-700";
            default:
                return "bg-gray-50 border-gray-200 text-gray-700";
        }
    };

    const getCategoryIcon = (category: Notice["category"]) => {
        switch (category) {
            case "announcement":
                return <Bell className="h-5 w-5" />;
            case "event":
                return <Calendar className="h-5 w-5" />;
            case "deadline":
                return <Clock className="h-5 w-5" />;
            default:
                return null;
        }
    };

    const NoticeItem = ({ notice }: { notice: Notice }) => (
        <div
            className={cn(
                "p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md",
                getCategoryStyles(notice.category)
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {getCategoryIcon(notice.category)}
                    <h3 className="font-semibold text-lg">{notice.title}</h3>
                </div>
                {notice.isPinned && (
                    <Pin className="h-5 w-5 text-gray-500 rotate-45" />
                )}
            </div>
            <p className="mt-2 text-gray-600">{notice.content}</p>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {notice.date}
                </span>
                {notice.time && (
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {notice.time}
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <Card className="mx-4 lg:mx-8 w-full md:w-auto">
            <ScrollArea className="h-96 p-4">
                <div className={cn("space-y-6", className)}>
                    {pinnedNotices.length > 0 && (
                        <div className="space-y-4 text-site-primary">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Pin className="h-5 w-5" /> Pinned Notices
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-1">
                                {pinnedNotices.map((notice) => (
                                    <NoticeItem
                                        key={notice.id}
                                        notice={notice}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-site-primary">
                            Recent Notices
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-1">
                            {regularNotices.map((notice) => (
                                <NoticeItem key={notice.id} notice={notice} />
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </Card>
    );
}
