"use client";

import dynamic from "next/dynamic";
import FooterLogo from "./footer-logo";
import FooterNavigation from "./footer-navigation";
import FooterCopyright from "./footer-copyright";
import Container from "@/components/ui/container";
import { footerLinks, storeLinks } from "@/site-data";
import FooterContact from "./footer-contact";

// Lazy-load non-critical components
const FooterSocials = dynamic(() => import("./footer-socials"), { ssr: false });
const FooterNewsletter = dynamic(() => import("./footer-newsletter"), {
    ssr: false,
});

export default function Footer() {
    return (
        <footer className="bg-background border-t">
            <Container className="my-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
                    <div className="flex flex-col justify-center items-start gap-y-4">
                        <FooterLogo />
                        <FooterContact />
                    </div>
                    <FooterNavigation linkLink={storeLinks} />
                    <FooterNavigation linkLink={footerLinks} />
                    <FooterNewsletter />
                </div>
                <div className="mt-6 flex justify-center">
                    <FooterSocials />
                </div>

                <FooterCopyright />
            </Container>
        </footer>
    );
}
