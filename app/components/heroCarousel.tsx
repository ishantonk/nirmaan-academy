'use client';

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function HeroCarousel() {
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1 h-full w-full">
                            <Card className="w-full h-full">
                                <CardContent className="flex w-full h-full items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">
                                        {index + 1}
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
