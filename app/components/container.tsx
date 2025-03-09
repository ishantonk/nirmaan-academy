"use client";

interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div
            className="
                container mx-auto py-12 px-4 sm:px-6 lg:px-8
            "
        >
            {children}
        </div>
    );
}
