import React from "react";

interface AspectRatioProps {
    children: React.ReactNode;
    ratio?: number;
    className?: string;
}

export default function AspectRatio({
    children,
    ratio = 16 / 9,
    className = "",
}: AspectRatioProps) {
    return (
        <div
            className={`h-full flex items-center justify-center ${className}`}
            style={{
                aspectRatio: ratio,
                maxWidth: "100%",
                width: "fit-content",
            }}
        >
            <div className="w-full h-full">{children}</div>
        </div>
    );
}
