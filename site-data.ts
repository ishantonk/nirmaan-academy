import {
    Atom,
    Calculator,
    Dna,
    FileChartLine,
    FlaskConical,
    GraduationCap,
    Home,
    Library,
    LifeBuoy,
    MessageSquareWarning,
    MonitorPlay,
    NotebookPen,
    Rss,
} from "lucide-react";

export const companyName = "Nirmaan academy";

export const contactInformation = {
    address: "Pan Oasis Sector 70 Noida",
    email: "support@nirmaanacademy.com",
    phone: "+91 9050363676",
};
export const navigationItems = [
    {
        title: "Home",
        href: "/",
        icon: Home,
    },
    {
        title: "Video Lessons",
        icon: MonitorPlay,
        items: [
            {
                title: "All Courses",
                href: "/courses",
                description: "Browse all courses.",
                icon: Library,
            },
            {
                title: "Physics",
                href: "/courses/physics",
                description: "Learn Physics from the best teachers.",
                icon: Atom,
            },
            {
                title: "Chemistry",
                href: "/courses/chemistry",
                description: "Learn Chemistry from the best teachers.",
                icon: FlaskConical,
            },
            {
                title: "Mathematics",
                href: "/courses/mathematics",
                description: "Learn Mathematics from the best teachers.",
                icon: Calculator,
            },
            {
                title: "Biology",
                href: "/courses/biology",
                description: "Learn Biology from the best teachers.",
                icon: Dna,
            },
        ],
    },
    {
        title: "PDF Lessons",
        icon: FileChartLine,
        items: [
            {
                title: "All PDF Lessons",
                href: "/pdf-lessons",
                description: "Browse all PDF lessons.",
                icon: Library,
            },
            {
                title: "Physics",
                href: "/pdf-lessons/physics",
                description: "Download Physics PDF lessons.",
                icon: Library,
            },
            {
                title: "Chemistry",
                href: "/pdf-lessons/chemistry",
                description: "Download Chemistry PDF lessons.",
                icon: Library,
            },
            {
                title: "Mathematics",
                href: "/pdf-lessons/mathematics",
                description: "Download Mathematics PDF lessons.",
                icon: Library,
            },
            {
                title: "Biology",
                href: "/pdf-lessons/biology",
                description: "Download Biology PDF lessons.",
                icon: Library,
            },
        ],
    },
    {
        title: "Test series",
        href: "#",
        icon: NotebookPen,
    },
    {
        title: "Faculty",
        href: "/faculty",
        icon: GraduationCap,
    },
    {
        title: "Blog",
        href: "/blogs",
        icon: Rss,
    },
    {
        title: "About Us",
        href: "/about",
        icon: MessageSquareWarning,
    },
    {
        title: "Contact and Support",
        href: "/support",
        icon: LifeBuoy,
    },
];

export const storeLinks = [
    { href: "/courses", label: "Courses" },
    { href: "/cart", label: "Cart" },
    { href: "/wishlist", label: "wishlist" },
    { href: "/checkout", label: "Checkout" },
    { href: "/settings", label: "My account" },
];

export const footerLinks = [
    { href: "/about", label: "About Us" },
    { href: "/support", label: "Contact & Support" },
    { href: "/refund-policy", label: "Refund & Returns Policy" },
    { href: "/privacy-policy", label: "Privacy Policy" },
];
