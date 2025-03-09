"use client";

import Image from "next/image";
import Container from "./container";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const courses = [
    {
        id: 1,
        name: "Financial Accounting By CA/CMA Santosh Kumar",
        href: "#",
        imageSrc: "/2-1.webp",
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
    },
];

export default function Popular() {
    return (
        <section>
            <Container>
                <div className="flex flex-col justify-center items-start gap-4 mx-4 md:mx-8 lg:mx-16">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
                        Popular courses
                    </h1>
                    <p className="text-lg text-gray-600 mb-16 max-w-3xl text-start">
                        We&apos;re a dynamic group of individuals who are
                        passionate about what we do and dedicated to delivering
                        the best results for our clients.
                    </p>

                    <CoursesCarousel />
                </div>
            </Container>
        </section>
    );
}

export function CoursesCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {courses.map((course) => (
                    <CarouselItem
                        key={course.id}
                        className="basis-1/2 lg:basis-1/4"
                    >
                        <Link href={course.href}>
                            <Card className="p-0 gap-2">
                                <CardContent className="p-0">
                                    <div className="relative w-fill h-fill mb-4">
                                        <Image
                                            src={course.imageSrc}
                                            alt={course.imageAlt}
                                            width={260}
                                            height={260}
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="pb-6 h-20 flex flex-col justify-center items-start gap-2">
                                    <CardTitle className="text-start">{course.name}</CardTitle>
                                    <CardDescription className="">
                                        {course.price}
                                    </CardDescription>
                                </CardFooter>
                            </Card>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
