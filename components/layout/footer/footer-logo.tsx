import Image from "next/image";
import Link from "next/link";

export default function FooterLogo() {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <Image
                src="/logo.png"
                alt="Company Logo"
                width={150}
                height={50}
                priority
            />
        </Link>
    );
}
