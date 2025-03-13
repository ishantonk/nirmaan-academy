"use client";

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import HeaderLogo from "./header-logo";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { navigationItems } from "@/site-data";
import Link from "next/link";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function MobileNavigation() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-2">
                <SheetTitle className="hidden">Nirmaan academy</SheetTitle>
                <HeaderLogo size="md" />

                <ScrollArea className="h-[calc(100vh-5rem)] pb-10 p-1 m-2 overflow-y-auto">
                    <div className="space-y-4 py-4">
                        {navigationItems.map((item) => (
                            <div key={item.title}>
                                {item.items ? (
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value={item.title}>
                                            <AccordionTrigger className="flex items-center px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground gap-x-2 hover:no-underline">
                                                <div className="flex items-center gap-x-2 ">
                                                    <item.icon className="w-6 h-6" />
                                                    {item.title}
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {item.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.title}
                                                        href={subItem.href!}
                                                        className="flex items-center px-2 py-2 ml-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground gap-x-2"
                                                        onClick={() =>
                                                            setOpen(false)
                                                        }
                                                    >
                                                        <subItem.icon className="w-6 h-6" />
                                                        {subItem.title}
                                                    </Link>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        className="flex items-center px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground gap-x-2 rounded-md"
                                        onClick={() => setOpen(false)}
                                    >
                                        <item.icon className="w-6 h-6" />
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
