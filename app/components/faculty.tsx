"use client";

import Image from "next/image";
import Container from "./container";
import * as React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const facultyMembers: { name: string; role: string; image: string }[] = [
    {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        image: "/1.png",
    },
    {
        name: "Dries Vincent",
        role: "Business Relations",
        image: "/2.png",
    },
    {
        name: "Lindsay Walton",
        role: "Front-end Developer",
        image: "/3.png",
    },
    {
        name: "Courtney Henry",
        role: "Designer",
        image: "/4.png",
    },
    {
        name: "Tom Cook",
        role: "Director of Product",
        image: "/5.png",
    },
    {
        name: "Whitney Francis",
        role: "Copywriter",
        image: "/2.png",
    },
];

export default function Faculty() {
    return (
        <section>
            <Container>
                <div className="flex flex-col justify-center items-start gap-4 mx-4 md:mx-8 lg:mx-16">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
                        Our faculty
                    </h1>
                    <p className="text-lg text-gray-600 mb-16 max-w-3xl text-start">
                        We&apos;re a dynamic group of individuals who are
                        passionate about what we do and dedicated to delivering
                        the best results for our clients.
                    </p>

                    <FacultyCarousel />
                </div>
            </Container>
        </section>
    );
}

export function FacultyCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {facultyMembers.map((member, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/2 lg:basis-1/4"
                    >
                        <div key={index} className="flex flex-col items-center">
                            <div className="relative w-32 h-32 mb-4">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                                {member.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {member.role}
                            </p>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
