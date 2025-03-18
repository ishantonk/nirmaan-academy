"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"

export function Hero({ categories }: { categories: any, }) {
    return (
        <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background">
            <div className="container relative z-10 py-20 md:py-8 mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center">
                    <div className="col-span-1 md:px-4 py-4">
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
                            <ul className="space-y-3">
                                {categories.slice(0, 4).map((category: any) => (
                                    <li key={category.id} className="flex items-center justify-between">
                                        <Link className="flex items-center justify-between w-full hover:text-primary transition-colors text-muted-foreground" href={`/categories/${category.slug}`}>
                                            <span className="text-sm text-muted-foreground">{category.name}</span>
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                                {category._count.courses} courses
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-2 md:px-4 py-4">
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
                    <div className="col-span-1 hidden md:block md:px-4 py-4">
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">About Our Platform</h3>
                                <p className="text-muted-foreground">
                                    Welcome to Nirmaan Academy, your premier destination for online learning. We offer a comprehensive selection of courses taught by industry experts.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        <span>Expert-led video courses</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        <span>Interactive learning materials</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        <span>Professional certification</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        <span>24/7 support community</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}