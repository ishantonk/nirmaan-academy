"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { blogs } from "@/dummy-data";
import BlogCard from "./blog-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function BlogCarousel() {
    const [api, setApi] = React.useState<CarouselApi | null>(null);
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

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
                plugins={[
                    Autoplay({
                        delay: 6000,
                    }),
                ]}
                setApi={setApi}
                className="overflow-hidden"
            >
                <CarouselContent className="m-4">
                    {blogs.slice(0, 6).map((blog) => (
                        <CarouselItem
                            key={blog.id}
                            className="basis-full lg:basis-1/3"
                        >
                            <BlogCard blog={blog} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            {/* Floating Previous Button */}
            <Button
                onClick={() => api?.scrollPrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-gray-100 text-primary"
            >
                <ChevronLeft size={24} />
            </Button>

            {/* Floating Next Button */}
            <Button
                onClick={() => api?.scrollNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-gray-100 text-primary"
            >
                <ChevronRight size={24} />
            </Button>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: count }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            index === current
                                ? "bg-primary scale-110"
                                : "bg-secondary"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
