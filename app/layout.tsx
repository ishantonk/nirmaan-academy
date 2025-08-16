import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/layout/header/site-header";
import { Toaster } from "sonner";
import SiteInfo from "@/lib/site-info";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/lib/provider/theme-provider";
import QueryProvider from "@/lib/provider/query-provider";
import AuthProvider from "@/lib/provider/auth-provider";
import SiteFooter from "@/components/layout/footer/site-footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: `Home ${SiteInfo.Title}`,
    description: SiteInfo.TagLine,
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "flex flex-col min-h-screen h-screen",
                    geistSans.variable,
                    geistMono.variable,
                    "antialiased"
                )}
            >
                <AuthProvider>
                    <QueryProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <SiteHeader />
                            {children}
                            <SiteFooter />
                            <Toaster />
                        </ThemeProvider>
                    </QueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
