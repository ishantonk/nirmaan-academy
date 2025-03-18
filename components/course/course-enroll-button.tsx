"use client"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CourseEnrollButtonProps {
  courseId: string
}

export function CourseEnrollButton({ courseId }: CourseEnrollButtonProps) {
  const router = useRouter()

  const { mutate: enrollCourse, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to enroll in course")
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("Enrolled successfully",{
        description: "You have been enrolled in this course.",
      })
      router.push(`/dashboard/courses/${courseId}`)
    },
    onError: (error) => {
      toast.error("Something went wrong",{
        description: error instanceof Error ? error.message : "Failed to enroll in course",
      })
    },
  })

  return (
    <Button onClick={() => enrollCourse()} disabled={isPending} className="w-full">
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enrolling...
        </>
      ) : (
        "Enroll Now (Free)"
      )}
    </Button>
  )
}

