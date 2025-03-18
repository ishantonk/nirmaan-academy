import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EnrolledCourseCard } from "@/components/dashboard/enrolled-course-card"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export default async function DashboardPage() {
  const session = await getAuthSession()

  if (!session) {
    redirect("/login")
  }

  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: {
        include: {
          category: true,
        },
      },
      progress: {
        include: {
          lesson: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Calculate progress for each enrollment
  const enrollmentsWithProgress = enrollments.map((enrollment) => {
    const completedLessons = enrollment.progress.filter((progress) => progress.completed).length

    const totalLessons = enrollment.progress.length

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    return {
      ...enrollment,
      completedLessons,
      totalLessons,
      progressPercentage,
    }
  })

  return (
    <div className="container py-8 mx-auto px-4">
      <DashboardHeader heading="Dashboard" text="View your enrolled courses and track your progress." />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Courses</h2>

        {enrollmentsWithProgress.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses found"
            description="You haven't enrolled in any courses yet. Browse our courses to get started."
            action={
              <Button asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrollmentsWithProgress.map((enrollment) => (
              <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

