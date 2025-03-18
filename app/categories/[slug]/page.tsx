import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BookOpen } from "lucide-react"

import { prisma } from "@/lib/prisma"
import { CourseGrid } from "@/components/course/course-grid"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} Courses | EduPlatform`,
    description: category.description || `Browse ${category.name} courses on EduPlatform`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!category) {
    notFound()
  }

  const courses = await prisma.course.findMany({
    where: {
      categoryId: category.id,
      status: "PUBLISHED",
    },
    include: {
      instructor: {
        select: {
          name: true,
          image: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container py-8 mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && <p className="mt-2 text-muted-foreground">{category.description}</p>}
      </div>

      {courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description={`There are no courses in the ${category.name} category yet.`}
          action={
            <Button asChild>
              <Link href="/courses">Browse All Courses</Link>
            </Button>
          }
        />
      ) : (
        <CourseGrid courses={courses} />
      )}
    </div>
  )
}

