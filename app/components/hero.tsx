"use client";

import Image from "next/image";
import * as React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { NoticeBoard } from "./noticeBoard";
import { notices } from "@/dummy-data";


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
