import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CourseNavigation } from "@/components/course/course-navigation"
import { CourseVideoPlayer } from "@/components/course/course-video-player"
import { CourseProgressButton } from "@/components/course/course-progress-button"

interface CourseLearnPageProps {
  params: {
    slug: string
  }
}

export default async function CourseLearnPage({ params }: CourseLearnPageProps) {
  const session = await getAuthSession()

  if (!session) {
    redirect(`/login?callbackUrl=/courses/${params.slug}/learn`)
  }

  const course = await prisma.course.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      sections: {
        orderBy: {
          position: "asc",
        },
        include: {
          lessons: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  })

  if (!course) {
    redirect("/courses")
  }

  // Check if user is enrolled
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: session.user.id,
      courseId: course.id,
    },
    include: {
      progress: true,
    },
  })

  if (!enrollment) {
    redirect(`/courses/${params.slug}`)
  }

  // Get first lesson if no progress
  const progressCount = enrollment.progress.length

  let currentLessonId = enrollment.progress[0]?.lessonId

  // If no progress, get first lesson
  if (progressCount === 0 && course.sections[0]?.lessons[0]) {
    currentLessonId = course.sections[0].lessons[0].id
  }

  if (!currentLessonId) {
    redirect(`/courses/${params.slug}`)
  }

  const currentLesson = await prisma.lesson.findUnique({
    where: {
      id: currentLessonId,
    },
  })

  if (!currentLesson) {
    redirect(`/courses/${params.slug}`)
  }

  // Get lesson progress
  const lessonProgress = await prisma.progress.findUnique({
    where: {
      enrollmentId_lessonId: {
        enrollmentId: enrollment.id,
        lessonId: currentLesson.id,
      },
    },
  })

  return (
    <div className="flex h-full flex-col mx-auto px-4">
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block md:w-80 md:flex-shrink-0 md:border-r">
          <CourseNavigation course={course} currentLessonId={currentLesson.id} progress={enrollment.progress} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="flex h-full flex-col">
            <div className="aspect-video">
              <CourseVideoPlayer videoUrl={currentLesson.videoUrl || ""} lessonTitle={currentLesson.title} />
            </div>
            <div className="p-4 md:p-6">
              <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
              <div className="mt-2 text-muted-foreground">{currentLesson.description}</div>
              <div className="mt-6">
                <CourseProgressButton
                  lessonId={currentLesson.id}
                  enrollmentId={enrollment.id}
                  isCompleted={!!lessonProgress?.completed}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

