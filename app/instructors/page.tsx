import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Our Instructors - Nirmaan Academy",
  description: "Meet our expert instructors who are passionate about teaching business and corporate law.",
}

async function getInstructors() {
  const instructors = await prisma.user.findMany({
    where: {
      role: UserRole.INSTRUCTOR,
    },
    include: {
      _count: {
        select: {
          courses: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  return instructors
}

export default async function InstructorsPage() {
  const instructors = await getInstructors()

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Our Expert Instructors</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Learn from experienced professionals in business law, corporate governance, and finance law.
        </p>
      </div>

      {/* Instructors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor) => (
          <Link key={instructor.id} href={`/instructors/${instructor.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={instructor.image || ""} alt={instructor.name || ""} />
                  <AvatarFallback>{instructor.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-semibold">{instructor.name}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {instructor.email}
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{instructor.bio}</p>
                <div className="text-sm text-muted-foreground">
                  {instructor._count.courses} {instructor._count.courses === 1 ? 'Course' : 'Courses'}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 