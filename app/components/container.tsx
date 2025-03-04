"use client";

interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div
            className="
                container
                mx-auto
                md:px-5
            "
        >
            {children}
        </div>
    );
}
