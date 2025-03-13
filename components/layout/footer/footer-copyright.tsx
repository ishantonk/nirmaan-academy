import { companyName } from "@/site-data";

export default function FooterCopyright() {
    return (
        <p className="mt-6 text-center text-xs text-muted-foreground py-4">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
    );
}
