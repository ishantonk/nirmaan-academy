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

export default function Gallery() {
    return (
        <section>
            <Container>
                <div className="flex flex-col justify-center items-start gap-4 mx-4 md:mx-8 lg:mx-16">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
                        Our gallery
                    </h1>
                    <p className="text-lg text-gray-600 mb-16 max-w-3xl text-start">
                        Discover a world of knowledge through our curated
                        educational resources and images.
                    </p>

                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="flex flex-col justify-center items-center w-full max-w-md lg:max-w-2xl">
                            <GalleryCarousel />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export function GalleryCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {galleryImages.map((item) => (
                    <CarouselItem key={item.id} className="basis-full">
                        <div
                            key={item.id}
                            className="relative flex flex-col items-center w-full h-56 lg:h-96 rounded-lg overflow-hidden"
                        >
                            <div className="absolute z-10 bottom-10 flex flex-col justify-center items-center">
                                <p className="text-xl font-semibold text-white">{item.caption}</p>
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
