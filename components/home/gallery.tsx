"use client";

import {
    Carousel,
    CarouselNext,
    CarouselDots,
    CarouselPrevious,
    CarouselContent,
    CarouselItem,
} from "../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Award, BookOpen, Users } from "lucide-react";

export function Gallery() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="col-span-1">
                        <div className="flex flex-col items-center justify-between w-full mb-12 text-center">
                            <h2 className="text-3xl font-bold">Our Gallery</h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                                Explore moments captured from our journey.
                            </p>
                        </div>
                        <div className="flex items-center justify-center overflow-hidden max-w-xl mx-auto">
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
                                        <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-xl">
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
                                        <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-xl">
                                            <Image
                                                src="/placeholder.svg?height=800&width=1200"
                                                alt="Online learning platform"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-xl">
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

                    {/* Features Section */}
                    <div className="col-span-1">
                        <div className="flex flex-col items-center justify-between w-full mb-12 text-center">
                            <h2 className="text-3xl font-bold">
                                Why Choose Nirmaan Academy
                            </h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                                Our platform offers a comprehensive learning
                                experience with features designed to help you
                                succeed.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-background rounded-lg p-6 shadow-sm">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <BookOpen className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Quality Content
                                </h3>
                                <p className="text-muted-foreground">
                                    All courses are created by industry experts
                                    and undergo a rigorous review process to
                                    ensure high-quality content.
                                </p>
                            </div>
                            <div className="bg-background rounded-lg p-6 shadow-sm">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Community Support
                                </h3>
                                <p className="text-muted-foreground">
                                    Join a community of learners and instructors
                                    who are passionate about sharing knowledge
                                    and helping each other grow.
                                </p>
                            </div>
                            <div className="bg-background rounded-lg p-6 shadow-sm">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <Award className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Certificates
                                </h3>
                                <p className="text-muted-foreground">
                                    Earn certificates upon course completion to
                                    showcase your skills and knowledge to
                                    employers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
