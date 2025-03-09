"use client";

import { Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Container from "./container";

const testimonials = [
    {
        quote: "This platform has completely transformed my learning experience. The interactive lessons and personalized feedback have helped me understand difficult concepts in a way I never thought possible. Highly recommend to anyone looking to advance their knowledge!",
        author: "John D.",
        role: "Student",
        rating: 5,
    },
    {
        quote: "I enrolled my daughter in a math course on this site, and her grades have improved significantly. The tutors are so supportive, and the content is engaging and thorough. It's been an incredible investment in her future!",
        author: "Sarah T.",
        role: "Parent",
        rating: 4,
    },
    {
        quote: "As an educator, I appreciate how comprehensive and well-structured the courses are. The site offers excellent resources that help both students and teachers. It’s been an invaluable tool in my classroom.",
        author: "Michael W.",
        role: "Teacher",
        rating: 5,
    },
    {
        quote: "I was struggling to stay motivated with my online classes, but this site made learning exciting again. The community and support system keep me on track, and the courses are challenging yet manageable.",
        author: "Emma L.",
        role: "Student",
        rating: 4,
    },
    {
        quote: "The real-world applications shared throughout the courses are so helpful. I feel confident in applying what I’ve learned to my career. This platform provides education that truly prepares you for the future!",
        author: "David K.",
        role: "Student",
        rating: 5,
    },
    {
        quote: "I’m so grateful for this platform! It has helped my child develop a love for learning. The courses are detailed, and the teachers are always available to help. It’s been a game-changer!",
        author: "Olivia R.",
        role: "Parent",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section>
            <Container>
                <div className="flex flex-col justify-center items-start gap-4 mx-4 md:mx-8 lg:mx-16">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
                        Testimonials
                    </h1>
                    <p className="text-lg text-gray-600 mb-16 max-w-3xl text-start">
                        Discover how our services have made a difference in the
                        lives of our clients.
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
                {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="basis-full lg:basis-1/3">
                        <TestimonialCard
                            quote={testimonial.quote}
                            author={testimonial.author}
                            role={testimonial.role}
                            rating={testimonial.rating}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    rating?: number;
}

export function TestimonialCard({
    quote,
    author,
    role,
    rating = 5,
}: TestimonialCardProps) {
    return (
        <Card className="max-w-md p-8 bg-white rounded-2xl shadow-lg">
            <div className="relative">
                <div className="absolute -top-8 -left-4 text-[80px] font-serif text-emerald-100">
                    &quot;
                </div>
                <blockquote className="relative text-gray-700 h-44 leading-relaxed mb-6 text-center overflow-hidden">
                    {quote}
                </blockquote>
            </div>

            <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                        key={index}
                        size={24}
                        className={`${
                            index < rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-200"
                        }`}
                    />
                ))}
            </div>

            <div className="text-center">
                <div className="font-semibold text-gray-900 mb-1">{author}</div>
                <div className="text-gray-600 text-sm">{role}</div>
            </div>
        </Card>
    );
}
