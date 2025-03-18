"use client"

import { useState } from "react"
import { Lock, PlayCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { formatDuration } from "@/lib/format"
import { Badge } from "@/components/ui/badge"

interface CourseSectionsProps {
  sections: any[]
  isEnrolled: boolean
}

export function CourseSections({ sections, isEnrolled }: CourseSectionsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(sections.map((section) => section.id))

  const totalLessons = sections.reduce((total, section) => total + section.lessons.length, 0)
  const totalDuration = sections.reduce(
    (total, section) => total + section.lessons.reduce((sectionTotal: number, lesson: { duration: number }) => sectionTotal + lesson.duration, 0),
    0,
  )

  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">
              {sections.length} {sections.length === 1 ? "section" : "sections"}
            </span>
            <span className="mx-2">•</span>
            <span className="font-medium">
              {totalLessons} {totalLessons === 1 ? "lesson" : "lessons"}
            </span>
            <span className="mx-2">•</span>
            <span className="font-medium">{formatDuration(totalDuration)} total duration</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setExpandedSections(
                expandedSections.length === sections.length ? [] : sections.map((section) => section.id),
              )
            }
          >
            {expandedSections.length === sections.length ? "Collapse all" : "Expand all"}
          </Button>
        </div>
      </div>

      <Accordion type="multiple" value={expandedSections} onValueChange={setExpandedSections}>
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <div className="flex flex-col items-start text-left">
                <span className="font-medium">{section.title}</span>
                <span className="text-xs text-muted-foreground">
                  {section.lessons.length} {section.lessons.length === 1 ? "lesson" : "lessons"}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-1">
              <ul className="divide-y">
                {section.lessons.map((lesson: any) => (
                  <li key={lesson.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                      {isEnrolled || lesson.isFree ? (
                        <PlayCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{formatDuration(lesson.duration)}</span>
                      {lesson.isFree && !isEnrolled && <Badge variant="outline">Free</Badge>}
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

