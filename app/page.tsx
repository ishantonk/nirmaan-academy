"use client";

import Container from "@/components/ui/container";
import Blog from "@/components/layout/home/blog";
import Course from "@/components/layout/home/course";
import Testimonial from "@/components/layout/home/testimonial";
import Faculty from "@/components/layout/home/faculty";
import Gallery from "@/components/layout/home/gallery";
import Hero from "@/components/layout/home/hero";

export default function Home() {
    return (
        <main>
            <Container className="space-y-8 lg:space-y-12 my-4 lg:my-8">
                <Hero />
                <Course />
                <Faculty />
                <Testimonial />
                <Gallery />
                <Blog />
            </Container>
        </main>
    );
}
