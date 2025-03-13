"use client";

import CoursesList from "@/components/course/course-list";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";

export default function CoursesPage() {
    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-1 md:px-6 lg:px-8 my-4 space-y-8">
                    <Heading description="Discover courses tailored to help you learn and grow.">
                        Our courses
                    </Heading>

                    <CoursesList />
                </section>
            </Container>
        </main>
    );
}
