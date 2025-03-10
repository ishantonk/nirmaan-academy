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
import { NoticeBoard } from "./noticeBoard";

interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    time?: string;
    category: "announcement" | "event" | "deadline";
    isPinned?: boolean;
}

const notices: Notice[] = [
    {
        id: "1",
        title: "Final Exam Schedule Released",
        content:
            "The final examination schedule for the Spring semester has been published. Please check your student portal for detailed information.",
        date: "2024-05-15",
        time: "09:00 AM",
        category: "announcement",
        isPinned: true,
    },
    {
        id: "2",
        title: "Annual Science Fair",
        content:
            "Join us for the Annual Science Fair where students will showcase their innovative projects. Prizes to be won!",
        date: "2024-06-10",
        time: "10:00 AM",
        category: "event",
        isPinned: true,
    },
    {
        id: "3",
        title: "Assignment Submission Deadline",
        content:
            "Final project reports for Computer Science 101 must be submitted by end of day.",
        date: "2024-05-20",
        time: "11:59 PM",
        category: "deadline",
    },
    {
        id: "4",
        title: "Campus Maintenance Notice",
        content:
            "The main library will be closed for maintenance this weekend. Online resources will remain accessible.",
        date: "2024-05-18",
        category: "announcement",
    },
];

const galleryImages: {
    id: number;
    caption: string;
    imageUrl: string;
    imageAlt: string;
}[] = [
    {
        id: 1,
        caption: "Sunset at the Beach",
        imageUrl: "/gallery-1.avif",
        imageAlt:
            "A beautiful sunset over the ocean with orange and purple hues.",
    },
    {
        id: 2,
        caption: "Mountain Adventure",
        imageUrl: "/gallery-2.avif",
        imageAlt:
            "A hiker standing on top of a mountain with a panoramic view.",
    },
    {
        id: 3,
        caption: "City Skyline",
        imageUrl: "/gallery-3.avif",
        imageAlt:
            "A bustling city skyline at night with lit buildings and streets.",
    },
    {
        id: 4,
        caption: "Forest Path",
        imageUrl: "/gallery-4.avif",
        imageAlt:
            "A winding path through a lush green forest with sunlight filtering through the trees.",
    },
    {
        id: 5,
        caption: "Winter Wonderland",
        imageUrl: "/gallery-5.avif",
        imageAlt:
            "A snow-covered landscape with pine trees and a bright blue sky.",
    },
];

export default function Hero() {
    return (
        <section>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg: items-end">
                    {/* Carousel */}
                    <div className="lg:col-span-4 flex justify-center">
                        <HeroCarousel />
                    </div>
                    
                    {/* Notice Board */}
                    <div className="lg:col-span-3 flex justify-center">
                        <NoticeBoard notices={notices} />
                    </div>
                </div>
            </Container>
        </section>
    );
}

export function HeroCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-11/12 lg:w-full"
        >
            <CarouselContent>
                {galleryImages.map((item) => (
                    <CarouselItem key={item.id} className="basis-full">
                        <div
                            key={item.id}
                            className="relative flex flex-col items-center w-full h-56 lg:h-96 rounded-lg overflow-hidden"
                        >
                            <div className="absolute z-10 bottom-10 flex flex-col justify-center items-center">
                                <p className="text-xl font-semibold text-white">
                                    {item.caption}
                                </p>
                            </div>
                            <div className="absolute inset-0">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.imageAlt}
                                    width={800}
                                    height={600}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
