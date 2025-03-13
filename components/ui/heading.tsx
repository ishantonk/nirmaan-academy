"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { JSX, ReactNode } from "react";

interface HeadingProps {
    as?: keyof JSX.IntrinsicElements;
    description?: string;
    children: ReactNode;
    className?: string;
}

export default function Heading({
    as = "h2",
    description,
    children,
    className,
}: HeadingProps) {
    const Tag = as as keyof JSX.IntrinsicElements;

    return (
        <div className="mx-auto max-w-6xl lg:mx-0 mb-2">
            <Slot
                className={cn(
                    "text-xl font-semibold tracking-tight text-pretty text-primary sm:text-4xl",
                    className
                )}
            >
                <Tag>{children}</Tag>
            </Slot>
            {description && (
                <p className="mt-2 text-lg/8 text-muted-foreground">{description}</p>
            )}
        </div>
    );
}
