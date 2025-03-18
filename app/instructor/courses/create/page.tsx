import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { CourseForm } from "@/components/course/course-form"
import { prisma } from "@/lib/prisma"

export default async function CreateCoursePage() {
  const session = await getAuthSession()

  if (!session) {
    redirect("/login")
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="container py-8 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Create Course</h1>
      <CourseForm categories={categories} />
    </div>
  )
}
