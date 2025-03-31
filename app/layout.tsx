import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { QueryProvider } from "@/components/query-provider";
import { SiteHeader } from "@/components/layout/header/site-header";
import { Toaster } from "sonner";
import SiteFooter from "@/components/layout/footer/site-footer";
import { brandName } from "@/data/contact-info";
import { aboutUsData } from "@/data/about-us";
import { ThemeProvider } from "@/components/theme-provider";
import { BottomNavBar } from "@/components/layout/bottom/bottom-navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: brandName,
    description: aboutUsData.description,
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
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <QueryProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <div className="flex min-h-screen flex-col">
                                <SiteHeader />
                                <main className="flex-1">{children}</main>
                                <SiteFooter />
                            </div>
                            <BottomNavBar />
                            <Toaster />
                        </ThemeProvider>
                    </QueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
