import type { Metadata } from "next"
import { Suspense } from "react"
import { Search } from "lucide-react"

import { prisma } from "@/lib/prisma"
import { CourseFilters } from "@/components/course/course-filters"
import { CourseGrid } from "@/components/course/course-grid"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Courses | EduPlatform",
  description: "Browse all courses",
}

interface CoursesPageProps {
  searchParams: {
    category?: string
    search?: string
    price?: string
    sort?: string
  }
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  // Fetch all categories for the filter
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="container py-8 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Browse Courses</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-20">
            <CourseFilters categories={categories} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6">
            <form action="/courses" method="GET">
              {/* Preserve other query params */}
              {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
              {searchParams.price && <input type="hidden" name="price" value={searchParams.price} />}
              {searchParams.sort && <input type="hidden" name="sort" value={searchParams.sort} />}

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  name="search"
                  placeholder="Search courses..."
                  className="pl-10"
                  defaultValue={searchParams.search}
                />
              </div>
            </form>
          </div>

          <Suspense fallback={<CourseGridSkeleton />}>
            <CourseList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function CourseList({ searchParams }: CoursesPageProps) {
  const { category, search, price, sort } = searchParams

  // Build the where clause for filtering
  const where: any = {
    status: "PUBLISHED",
  }

  // Category filter
  if (category) {
    where.category = {
      slug: category,
    }
  }

  // Search filter
  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ]
  }

  // Price filter
  if (price) {
    if (price === "free") {
      where.price = 0
    } else if (price === "paid") {
      where.price = {
        gt: 0,
      }
    }
  }

  // Determine sort order
  let orderBy: any = {
    createdAt: "desc",
  }

  if (sort === "price-asc") {
    orderBy = {
      price: "asc",
    }
  } else if (sort === "price-desc") {
    orderBy = {
      price: "desc",
    }
  } else if (sort === "title-asc") {
    orderBy = {
      title: "asc",
    }
  } else if (sort === "title-desc") {
    orderBy = {
      title: "desc",
    }
  }

  // Fetch courses with filters
  const courses = await prisma.course.findMany({
    where,
    include: {
      instructor: {
        select: {
          name: true,
          image: true,
        },
      },
      category: true,
    },
    orderBy,
  })

  return <CourseGrid courses={courses} />
}

function CourseGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border overflow-hidden">
          <Skeleton className="aspect-video w-full" />
          <div className="p-4">
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

