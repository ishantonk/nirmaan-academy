import type { Metadata } from "next"

import { prisma } from "@/lib/prisma"
import { CategoryCard } from "@/components/category-card"

export const metadata: Metadata = {
  title: "Categories | EduPlatform",
  description: "Browse all course categories",
}

export default async function CategoriesPage() {
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
      name: "asc",
    },
  })

  return (
    <div className="container py-8 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Browse Categories</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} courseCount={category._count.courses} />
        ))}
      </div>
    </div>
  )
}

