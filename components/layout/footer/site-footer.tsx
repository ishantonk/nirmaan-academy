import FooterMenu from "./footer-menu";
import Copyright from "./copyright";
import LogoInfo from "./logo-info";

export default function SiteFooter() {
    return (
        <footer className="bg-base-200 text-base-content grid-rows-2">
            <div className="footer sm:footer-horizontal p-10">
                <LogoInfo />
                <FooterMenu title="Services" items={servicesMenu} />
                <FooterMenu title="Company" items={companyMenu} />
                <FooterMenu title="Legal" items={legalMenu} />
            </div>
            <Copyright />
        </footer>
    );
}

const servicesMenu = [
    {
        href: "/courses",
        label: "Courses",
    },
    {
        href: "/blogs",
        label: "Blogs",
    },
    {
        href: "#",
        label: "E-Books",
    },
    {
        href: "/cart",
        label: "Cart",
    },
    {
        href: "/faculties",
        label: "Faculties",
    },
];

const companyMenu = [
    {
        href: "/about",
        label: "About us",
    },
    {
        href: "/contact",
        label: "Contact",
    },
];

const legalMenu = [
    {
        href: "/terms",
        label: "Terms of use",
    },
    {
        href: "/refund",
        label: "Refund & return policy",
    },
    {
        href: "/privacy",
        label: "Privacy policy",
    },
    {
        href: "/cookie",
        label: "Cookie policy",
    },
];
