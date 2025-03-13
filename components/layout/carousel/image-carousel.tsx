"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { imagesData } from "@/dummy-data";



export default function CourseCarousel() {
    const [api, setApi] = React.useState<CarouselApi | null>(null);
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const autoplay = React.useRef(Autoplay({ delay: 4000 }));

    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => setCurrent(api.selectedScrollSnap()));
    }, [api]);

    return (
        <div className="relative w-full mx-auto">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[autoplay.current]}
                setApi={setApi}
                className="overflow-hidden"
            >
                <CarouselContent className="m-4">
                    {imagesData.map((item) => (
                        <CarouselItem key={item.id} className="relative">
                            <Image
                                src={item.imageUrl}
                                alt={item.imageAlt}
                                width={600}
                                height={300}
                                className="w-full h-96 rounded object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 text-white text-center -translate-y-10">
                                <p className="text-lg font-semibold">
                                    {item.caption}
                                </p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Floating Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 p-2 rounded-full">
                {Array.from({ length: count }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === current
                                ? "bg-primary scale-110"
                                : "bg-secondary/70"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
