import Link from "next/link";

interface FooterNavigationProps {
    linkLink: { href: string; label: string }[];
}

export default function FooterNavigation({ linkLink }: FooterNavigationProps) {
    return (
        <nav className="text-sm text-muted-foreground space-y-2">
            {linkLink.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className="block hover:text-foreground transition"
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}
