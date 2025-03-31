import type { Metadata } from "next"
import Link from "next/link"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/course/course-card"
import { EmptyState } from "@/components/empty-state"

export const metadata: Metadata = {
  title: "Instructor Courses | EduLearn",
  description: "Manage your courses",
}

export default async function InstructorCoursesPage() {
  const session = await getAuthSession()

  if (!session) {
    return null
  }

  const courses = await prisma.course.findMany({
    where: {
      instructorId: session.user.id,
    },
    include: {
      category: true,
      instructor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container py-8 mx-auto px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Courses</h1>
        <Button asChild>
          <Link href="/instructor/courses/create">Create Course</Link>
        </Button>
      </div>

      <div className="mt-8">
        {courses.length === 0 ? (
          <EmptyState
            title="No courses found"
            description="You haven't created any courses yet. Start creating your first course."
            action={
              <Button asChild>
                <Link href="/instructor/courses/create">Create Course</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course.id}>
                <CourseCard
                  key={course.id}
                  course={course}
                  href={`/instructor/courses/${course.id}`}
                  actions={
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/instructor/courses/${course.id}`}>Manage</Link>
                    </Button>
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

