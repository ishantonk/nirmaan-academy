import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface EnrolledCourseCardProps {
  enrollment: any
}

export function EnrolledCourseCard({ enrollment }: EnrolledCourseCardProps) {
  const { course, progressPercentage, completedLessons, totalLessons } = enrollment

  return (
    <Card className="overflow-hidden">
      <Link href={`/courses/${course.slug}/learn`}>
        <div className="aspect-video relative">
          {course.thumbnail ? (
            <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No thumbnail</span>
            </div>
          )}
        </div>
      </Link>
      <CardHeader className="p-4">
        <Link href={`/courses/${course.slug}/learn`} className="hover:underline">
          <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{course.category?.name || "Uncategorized"}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full">
          <Link href={`/courses/${course.slug}/learn`}>
            {progressPercentage === 0 ? "Start Learning" : "Continue Learning"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

