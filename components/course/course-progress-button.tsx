"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CourseProgressButtonProps {
  lessonId: string
  enrollmentId: string
  isCompleted: boolean
}

export function CourseProgressButton({ lessonId, enrollmentId, isCompleted }: CourseProgressButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      const response = await fetch("/api/progress", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
          enrollmentId,
          completed: !isCompleted,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update progress")
      }

      toast.success(isCompleted ? "Lesson marked as incomplete" : "Lesson completed", {
        description: isCompleted ? "Your progress has been updated" : "Keep up the good work!",
      })

      router.refresh()
    } catch {
      toast.error("Something went wrong", {
        description: "Failed to update progress. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant={isCompleted ? "outline" : "default"}
      className="w-full md:w-auto"
    >
      {isLoading ? (
        "Updating..."
      ) : isCompleted ? (
        <>
          <XCircle className="mr-2 h-4 w-4" />
          Mark as incomplete
        </>
      ) : (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark as complete
        </>
      )}
    </Button>
  )
}

