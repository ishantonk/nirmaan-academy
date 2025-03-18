import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/format"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CourseCardProps {
  course: {
    id: string
    title: string
    description: string | null
    thumbnail: string | null
    price: number
    category: {
      name: string
    }
    instructor: {
      name: string
      image: string | null
    }
  }
  href: string
  actions?: React.ReactNode
}

export function CourseCard({ course, href, actions }: CourseCardProps) {
  return (
    <Card className="group relative overflow-hidden p-0">
      <Link href={href} className="block">
        <div className="relative aspect-video overflow-hidden">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No thumbnail</span>
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{course.category.name}</Badge>
          <span className="font-semibold">{formatPrice(course.price)}</span>
        </div>
        <Link href={href} className="block">
          <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-primary">
            {course.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={course.instructor.image || undefined} />
            <AvatarFallback>
              {course.instructor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {course.instructor.name}
          </span>
        </div>
        {course.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        )}
      </CardContent>

      {actions && (
        <CardFooter className="flex justify-end gap-2">
          {actions}
        </CardFooter>
      )}
    </Card>
  )
}

