import { notFound } from "next/navigation"
import Image from "next/image"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { formatPrice, formatDuration } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/course/add-to-cart-button"
import { CourseReviews } from "@/components/course/course-reviews"
import { CourseSections } from "@/components/course/course-sections"
import { Clock, Users, Award } from "lucide-react"

interface CoursePageProps {
  params: {
    slug: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const session = await getAuthSession()

  const course = await prisma.course.findUnique({
    where: {
      slug: params.slug,
      status: "PUBLISHED",
    },
    include: {
      enrollments: true,
      instructor: {
        select: {
          id: true,
          name: true,
          image: true,
          bio: true,
        },
      },
      category: true,
      sections: {
        orderBy: {
          position: "asc",
        },
        include: {
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
              description: true,
              duration: true,
              isFree: true,
            },
          },
        },
      },
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!course) {
    notFound()
  }

  // Calculate total duration
  const totalDuration = course.sections.reduce(
    (total, section) => total + section.lessons.reduce((sectionTotal, lesson) => sectionTotal + lesson.duration, 0),
    0,
  )

  // Calculate average rating
  const averageRating =
    course.reviews.length > 0
      ? course.reviews.reduce((total, review) => total + review.rating, 0) / course.reviews.length
      : 0

  // Check if user is enrolled
  let isEnrolled = false

  if (session) {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        courseId: course.id,
      },
    })

    isEnrolled = !!enrollment
  }

  // Check if user has this course in cart
  let isInCart = false

  if (session) {
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        courseId: course.id,
      },
    })

    isInCart = !!cartItem
  }

  return (
    <div className="container py-8 mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="aspect-video overflow-hidden rounded-lg">
            {course.thumbnail ? (
              <Image
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                width={800}
                height={450}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-muted-foreground">No thumbnail</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <Badge className="w-fit">{course.category.name}</Badge>
          <h1 className="mt-2 text-3xl font-bold">{course.title}</h1>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 font-medium">{averageRating.toFixed(1)}</span>
              <span className="ml-1 text-muted-foreground">
                ({course.reviews.length} {course.reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{course.enrollments?.length || 0} students</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{formatDuration(totalDuration)}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Certificate of completion</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                {course.instructor.image ? (
                  <Image
                    src={course.instructor.image || "/placeholder.svg"}
                    alt={course.instructor.name || ""}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    {course.instructor.name?.[0] || "I"}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{course.instructor.name}</p>
                <p className="text-xs text-muted-foreground">Instructor</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{formatPrice(Number(course.price))}</span>
              {course.discountPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(Number(course.discountPrice))}</span>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {isEnrolled ? (
                <Button asChild className="w-full">
                  <a href={`/courses/${course.slug}/learn`}>Continue Learning</a>
                </Button>
              ) : (
                <AddToCartButton courseId={course.id} isInCart={isInCart} className="w-full" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold">About this course</h2>
              <div className="mt-4 prose max-w-none">
                <p>{course.description}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Course content</h2>
              <div className="mt-4">
                <CourseSections sections={course.sections} isEnrolled={isEnrolled} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Instructor</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  {course.instructor.image ? (
                    <Image
                      src={course.instructor.image || "/placeholder.svg"}
                      alt={course.instructor.name || ""}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      {course.instructor.name?.[0] || "I"}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{course.instructor.name}</h3>
                  <p className="text-muted-foreground">{course.instructor.bio || "No bio available"}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Reviews</h2>
              <div className="mt-4">
                <CourseReviews
                  reviews={course.reviews}
                  courseId={course.id}
                  isEnrolled={isEnrolled}
                  averageRating={averageRating}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border p-4 sticky top-20">
            <h3 className="text-lg font-semibold">This course includes:</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{formatDuration(totalDuration)} of on-demand video</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span>Certificate of completion</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{course.enrollments?.length || 0} students enrolled</span>
              </li>
            </ul>

            {!isEnrolled && (
              <div className="mt-6">
                <AddToCartButton courseId={course.id} isInCart={isInCart} className="w-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

