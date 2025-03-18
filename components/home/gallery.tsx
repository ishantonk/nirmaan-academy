"use client"

import { Carousel, CarouselNext, CarouselDots, CarouselPrevious, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";


export function Gallery() {
    return (
        <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background">
            <div className="container relative z-10 py-20 md:py-28 mx-auto px-4">
                <div className="flex flex-col items-center justify-between w-full mb-12 text-center">
                    <h2 className="text-3xl font-bold">Our Gallery</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Explore moments captured from our journey.
                    </p>
                </div>
                <div className="flex items-center justify-center overflow-hidden max-w-3xl mx-auto">
                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 2000,
                            }),
                        ]}
                        opts={{
                            align: "start",
                            loop: true,
                            containScroll: "trimSnaps",
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            <CarouselItem>
                                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                                    <Image
                                        src="/placeholder.svg?height=800&width=1200"
                                        alt="Students learning online"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                                    <Image
                                        src="/placeholder.svg?height=800&width=1200"
                                        alt="Online learning platform"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                                    <Image
                                        src="/placeholder.svg?height=800&width=1200"
                                        alt="Virtual classroom"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex -left-4" />
                        <CarouselNext className="hidden md:flex -right-4" />
                        <CarouselDots className="md:hidden" />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
