"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CheckCircle, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface CourseNavigationProps {
  course: any
  currentLessonId: string
  progress: any[]
}

export function CourseNavigation({ course, currentLessonId, progress }: CourseNavigationProps) {
  const pathname = usePathname()

  // Create a map of lesson IDs to progress
  const progressMap = progress.reduce(
    (acc, progressItem) => {
      acc[progressItem.lessonId] = progressItem.completed
      return acc
    },
    {} as Record<string, boolean>,
  )

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">{course.title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" defaultValue={course.sections.map((section: any) => section.id)} className="w-full">
          {course.sections.map((section: any) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{section.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {section.lessons.length} {section.lessons.length === 1 ? "lesson" : "lessons"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0 pt-1">
                {section.lessons.map((lesson: any) => {
                  const isActive = currentLessonId === lesson.id
                  const isCompleted = progressMap[lesson.id]

                  return (
                    <Button
                      key={lesson.id}
                      variant="ghost"
                      asChild
                      className={cn(
                        "relative flex w-full cursor-pointer items-center justify-start gap-2 rounded-none border-l-2 border-transparent p-4 text-sm font-medium hover:bg-muted",
                        isActive && "border-l-2 border-primary bg-muted",
                        isCompleted && "text-primary",
                      )}
                    >
                      <Link href={`${pathname}?lessonId=${lesson.id}`}>
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <PlayCircle className="h-4 w-4" />
                          )}
                          <span className="line-clamp-1">{lesson.title}</span>
                        </div>
                      </Link>
                    </Button>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

