import { CourseCard } from "@/components/course/course-card";
import { EmptyState } from "@/components/empty-state";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Decimal } from "@prisma/client/runtime/library";

interface CourseGridProps {
    courses: {
        id: string;
        slug: string;
        title: string;
        description: string | null;
        thumbnail: string | null;
        price: Decimal;
        category: { name: string };
        instructor: { name: string | null; image: string | null };
    }[];
}

export function CourseGrid({ courses }: CourseGridProps) {
    if (courses.length === 0) {
        return (
            <EmptyState
                icon={BookOpen}
                title="No courses found"
                description="Try adjusting your search or filter to find what you're looking for."
                action={
                    <Button asChild>
                        <Link href="/courses">Clear Filters</Link>
                    </Button>
                }
            />
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    href={`/courses/${course.slug}`}
                />
            ))}
        </div>
    );
}
