"use client";

import Container from "@/components/ui/container";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="flex items-center justify-center">
            <Container>{children}</Container>
        </main>
    );
}
