"use client";

import Link from "next/link";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const logoVariants = cva("relative transition-all duration-100", {
    variants: {
        size: {
            sm: "w-14 h-14",
            md: "w-24 h-24",
            lg: "w-30 h-30",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

interface HeaderLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export default function HeaderLogo({ className, size }: HeaderLogoProps) {
    return (
        <Link
            href="/"
            className={cn(
                "flex items-center space-x-4 font-semibold text-xl text-primary relative",
                className
            )}
            aria-label="Go to homepage"
        >
            <div className={cn(logoVariants({ size }))}>
                <Image
                    src={"/logo.png"}
                    alt="nirmaan-academy"
                    fill
                    style={{ position: "absolute", objectFit: "contain" }}
                />
            </div>
            <span className="hidden sm:inline-block">Nirmaan academy</span>
        </Link>
    );
}
