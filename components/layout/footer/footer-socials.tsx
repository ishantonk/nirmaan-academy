import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const socials = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
];

export default function FooterSocials() {
    return (
        <div className="flex space-x-4">
            {socials.map(({ href, icon: Icon, label }) => (
                <a
                    key={href}
                    href={href}
                    aria-label={label}
                    className="hover:text-primary transition"
                >
                    <Icon className="w-5 h-5" />
                </a>
            ))}
        </div>
    );
}
