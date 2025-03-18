"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"
import { Loader2, Pencil, Plus, Trash2, BookOpen, Users, Eye, BarChart3, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseForm } from "@/components/course/course-form"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

interface Course {
  id: string
  title: string
  slug: string
  description: string
  price: number
  discountPrice: number | null
  thumbnail: string
  durationInHours: number
  status: "DRAFT" | "PUBLISHED"
  featured: boolean
  createdAt: string
  updatedAt: string
  instructorId: string
  categoryId: string
  category?: {
    id: string
    name: string
    description: string | null
    slug: string
  }
  instructor?: {
    id: string
    name: string | null
    image: string | null
  }
  enrolledStudents: number
  totalRevenue: number
  averageRating: number
  totalLessons: number
  completionRate: number
}

interface Category {
  id: string
  name: string
}

export default function CourseManagePage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [categories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch course data")
        }
        const data = await response.json()
        setCourse(data)
        setIsLoading(false)
      } catch {
        toast.error("Failed to load course data")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleStatusUpdate = async () => {
    if (!course) return

    try {
      setIsUpdatingStatus(true)
      const newStatus = course.status === "DRAFT" ? "PUBLISHED" : "DRAFT"
      
      const response = await fetch(`/api/courses/${course.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update course status")
      }

      setCourse(prev => prev ? { ...prev, status: newStatus } : null)
      toast.success(`Course ${newStatus.toLowerCase()} successfully`)
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update course status")
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  const handleDelete = async () => {
    if (!course) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/courses/${course.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete course")
      }

      toast.success("Course deleted successfully")
      router.push("/instructor/courses")
    } catch (error) {
      console.error("Error deleting course:", error)
      toast.error("Failed to delete course")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!course) {
    return null
  }  

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">
            {course.status === "DRAFT" ? "Draft" : course.status === "PUBLISHED" ? "Published" : "Archived"}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Course Preview</DialogTitle>
                <DialogDescription>
                  This is how your course will appear to students
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 space-y-4">
                  <h2 className="text-2xl font-bold">{course.title}</h2>
                  <p className="text-muted-foreground">{course.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold">₹{course.price}</span>
                    <span className="text-sm text-muted-foreground">
                      {course.enrolledStudents} students enrolled
                    </span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            {isEditing ? "Cancel Editing" : "Edit Course"}
          </Button>
          <Button
            variant="default"
              onClick={() => router.push(`/instructor/courses/${course.slug}/lessons`)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Lesson
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Course</CardTitle>
                <CardDescription>Update your course information</CardDescription>
              </CardHeader>
              <CardContent>
                <CourseForm
                  initialData={course}
                  categories={categories}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Thumbnail</CardTitle>
                  <CardDescription>Preview your course thumbnail</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                  <CardDescription>View your course information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Title</h3>
                    <p className="text-muted-foreground">{course.title}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p className="text-muted-foreground">{course.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Price</h3>
                    <p className="text-muted-foreground">₹{course.price}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Status</h3>
                    <p className="text-muted-foreground capitalize">{course.status.toLowerCase()}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Enrolled Students</h3>
                    <p className="text-muted-foreground">{course.enrolledStudents}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Average Rating</h3>
                    <p className="text-muted-foreground">{course.averageRating.toFixed(1)} / 5</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="lessons">
          <Card>
            <CardHeader>
              <CardTitle>Course Lessons</CardTitle>
              <CardDescription>Manage your course lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button
                    onClick={() => router.push(`/instructor/courses/${course.slug}/lessons`)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Lesson
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Total Lessons</h3>
                    <p className="text-sm text-muted-foreground">{course.totalLessons} lessons</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Completion Rate</h3>
                    <p className="text-sm text-muted-foreground">{course.completionRate}%</p>
                  </div>
                </div>
                <Progress value={course.completionRate} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
              <CardDescription>View and manage enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Total Students</h3>
                    <p className="text-sm text-muted-foreground">{course.enrolledStudents} students</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Total Revenue</h3>
                    <p className="text-sm text-muted-foreground">₹{course.totalRevenue}</p>
                  </div>
                </div>
                {/* Students list will be added here */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Course Analytics</CardTitle>
              <CardDescription>Track your course performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card key="revenue">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{course.totalRevenue.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card key="students">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Enrolled Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.enrolledStudents.toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card key="rating">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.averageRating.toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground">out of 5</p>
                  </CardContent>
                </Card>
                <Card key="completion">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.completionRate.toFixed(1)}%</div>
                    <Progress value={course.completionRate} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
              <CardDescription>Manage your course settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Course Status</h3>
                    <p className="text-sm text-muted-foreground">
                      Change the visibility of your course
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleStatusUpdate}
                    disabled={isUpdatingStatus}
                  >
                    {isUpdatingStatus ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {course.status === "DRAFT" ? "Publish Course" : "Unpublish Course"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Delete Course</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your course
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Course
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your course
                          and all associated data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          Delete Course
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
