import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, Clock } from "lucide-react"
import Image from "next/image"

interface PageProps {
  params: {
    id: string
  }
}

async function getInstructor(id: string) {
  const instructor = await prisma.user.findUnique({
    where: {
      id,
      role: UserRole.INSTRUCTOR,
    },
    include: {
      courses: {
        where: {
          status: "PUBLISHED",
        },
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  return instructor
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const instructor = await getInstructor(params.id)

  if (!instructor) {
    return {
      title: "Instructor Not Found",
    }
  }

  return {
    title: `${instructor.name} - Nirmaan Academy Instructor`,
    description: instructor.bio,
  }
}

export default async function InstructorPage({ params }: PageProps) {
  const instructor = await getInstructor(params.id)

  if (!instructor) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Instructor Profile */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="text-center space-y-4">
          <Avatar className="w-40 h-40 mx-auto mb-6">
            <AvatarImage src={instructor.image || ""} alt={instructor.name || ""} />
            <AvatarFallback>{instructor.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold tracking-tight">{instructor.name}</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            {instructor.email}
          </div>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            {instructor.bio}
          </p>
        </div>
      </div>

      {/* Courses */}
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Courses by {instructor.name}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructor.courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <div className="relative h-48">
                <Image
                  src={course.thumbnail || "/images/courses/placeholder.jpg"}
                  alt={course.title}
                  height={200}
                  width={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">{course.category.name}</div>
                <Link href={`/courses/${course.slug}`} className="group">
                  <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {course.durationInHours} hours
                    </div>
                    <div>₹{course.price.toString()}</div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/courses/${course.slug}`}>
                      View Course
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 