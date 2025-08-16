import Link from "next/link";

interface FooterMenuProps {
    title: string;
    items: { href: string; label: string }[];
}

export default function FooterMenu({ title, items }: FooterMenuProps) {
    return (
        <nav>
            <h6 className="footer-title">{title}</h6>
            {items.map((item, idx) => (
                <Link className="link link-hover" href={item.href} key={idx}>
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
