'use client'

import Image from "next/image";

const courses = [
    {
        id: 1,
        name: "Financial Accounting By CA/CMA Santosh Kumar",
        href: "#",
        imageSrc:
            "/2-1.webp",
        imageAlt: "Front of men's Basic Tee in black.",
        price: "₹4,500.00 – ₹8,000.00",
    },
    {
        id: 2,
        name: "Advanced Excel By John Doe",
        href: "#",
        imageSrc: "/3-1.webp",
        imageAlt: "Advanced Excel course cover image.",
        price: "₹3,000.00 – ₹6,000.00",
    },
    {
        id: 3,
        name: "Digital Marketing By Jane Smith",
        href: "#",
        imageSrc: "/4-1.webp",
        imageAlt: "Digital Marketing course cover image.",
        price: "₹5,000.00 – ₹10,000.00",
    },
    {
        id: 4,
        name: "Data Science By Dr. Alan Turing",
        href: "#",
        imageSrc: "/3-1.webp",
        imageAlt: "Data Science course cover image.",
        price: "₹7,500.00 – ₹15,000.00",
    },
    {
        id: 5,
        name: "Web Development By Tim Berners-Lee",
        href: "#",
        imageSrc: "/2-1.webp",
        imageAlt: "Web Development course cover image.",
        price: "₹6,000.00 – ₹12,000.00",
    },
    {
        id: 6,
        name: "Graphic Design By Paula Scher",
        href: "#",
        imageSrc: "/4-1.webp",
        imageAlt: "Graphic Design course cover image.",
        price: "₹4,000.00 – ₹9,000.00",
    },
    {
        id: 7,
        name: "Machine Learning By Andrew Ng",
        href: "#",
        imageSrc: "/2-1.webp",
        imageAlt: "Machine Learning course cover image.",
        price: "₹8,000.00 – ₹16,000.00",
    },
    {
        id: 8,
        name: "Cyber Security By Kevin Mitnick",
        href: "#",
        imageSrc: "/3-1.webp",
        imageAlt: "Cyber Security course cover image.",
        price: "₹7,000.00 – ₹14,000.00",
    }
];

export default function CoursesPage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-site-secondary">
                    Our Courses
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {courses.map((product) => (
                        <div key={product.id} className="group relative">
                            <Image
                                alt={product.imageAlt}
                                src={product.imageSrc}
                                width={500}
                                height={500}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            />
                                            {product.name}
                                        </a>
                                    </h3>
                                </div>
                                <p className="text-xs font-medium text-gray-900">
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
