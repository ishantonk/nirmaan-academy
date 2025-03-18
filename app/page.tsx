import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/course/course-card";
import { CategoryCard } from "@/components/category-card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselDots,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/testimonials";
import { Hero } from "@/components/home/hero";
import { Gallery } from "@/components/home/gallery";

export default async function HomePage() {
    // Fetch featured courses
    const featuredCourses = await prisma.course.findMany({
        where: {
            featured: true,
            status: "PUBLISHED",
        },
        include: {
            category: true,
            instructor: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
        take: 8,
    });

    // Fetch popular categories
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: {
                    courses: {
                        where: {
                            status: "PUBLISHED",
                        },
                    },
                },
            },
        },
        orderBy: {
            courses: {
                _count: "desc",
            },
        },
        take: 4,
    });

    return (
        <div>
            {/* Hero Section */}
            <Hero categories={categories} />

            {/* Features Section */}
            <section className="py-16 bg-muted/50">
                <div className="container mx-auto px-4">
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
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Quality Content
                            </h3>
                            <p className="text-muted-foreground">
                                All courses are created by industry experts and
                                undergo a rigorous review process to ensure
                                high-quality content.
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
                                Join a community of learners and instructors who
                                are passionate about sharing knowledge and
                                helping each other grow.
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
                                showcase your skills and knowledge to employers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">
                                Featured Courses
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Explore our most popular and highly-rated
                                courses
                            </p>
                        </div>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/courses">
                                View All Courses
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="relative px-12">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                containScroll: "trimSnaps",
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {featuredCourses.map((course) => (
                                    <CarouselItem
                                        key={course.id}
                                        className="pl-4 md:basis-1/2 lg:basis-1/3"
                                    >
                                        <div className="h-full">
                                            <CourseCard
                                                course={{
                                                    id: course.id,
                                                    title: course.title,
                                                    description:
                                                        course.description,
                                                    thumbnail: course.thumbnail,
                                                    price: Number(course.price),
                                                    category: {
                                                        name: course.category
                                                            .name,
                                                    },
                                                    instructor: {
                                                        name:
                                                            course.instructor
                                                                .name || "",
                                                        image: course.instructor
                                                            .image,
                                                    },
                                                }}
                                                href={`/courses/${course.slug}`}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex -left-4" />
                            <CarouselNext className="hidden md:flex -right-4" />
                            <CarouselDots className="md:hidden" />
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold">
                                Browse Categories
                            </h2>
                            <p className="mt-2 text-muted-foreground">
                                Find the perfect course by exploring our
                                categories
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/categories">
                                All Categories
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="relative px-12">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                containScroll: "trimSnaps",
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {categories.map((category) => (
                                    <CarouselItem
                                        key={category.id}
                                        className="pl-4 md:basis-1/2 lg:basis-1/4"
                                    >
                                        <div className="h-full">
                                            <CategoryCard
                                                category={category}
                                                courseCount={
                                                    category._count.courses
                                                }
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex -left-4" />
                            <CarouselNext className="hidden md:flex -right-4" />
                            <CarouselDots className="md:hidden" />
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <Gallery />

            {/* Testimonials Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">
                            What Our Students Say
                        </h2>
                        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                            Hear from our students about how Nirmaan Academy has
                            helped them achieve their learning goals and advance
                            their careers.
                        </p>
                    </div>
                    <div className="relative px-12">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                containScroll: "trimSnaps",
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {testimonials.map((testimonial, i) => (
                                    <CarouselItem
                                        key={i}
                                        className="pl-4 md:basis-1/2 lg:basis-1/3"
                                    >
                                        <div className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow h-full">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                                    <Image
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">
                                                        {testimonial.name}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground italic mb-4">
                                                {testimonial.content}
                                            </p>
                                            <div className="flex items-center gap-1">
                                                {[
                                                    ...Array(
                                                        testimonial.rating
                                                    ),
                                                ].map((_, star) => (
                                                    <svg
                                                        key={star}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="w-5 h-5 text-yellow-500"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex -left-4" />
                            <CarouselNext className="hidden md:flex -right-4" />
                            <CarouselDots className="md:hidden" />
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Start Learning?
                        </h2>
                        <p className="text-xl mb-8 text-primary-foreground/80">
                            Join thousands of students and start your learning
                            journey today. Get access to hundreds of courses
                            taught by expert instructors.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/courses">Browse Courses</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                                asChild
                            >
                                <Link href="/auth/register">
                                    Sign Up for Free
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
