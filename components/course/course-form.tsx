"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { ImageUpload } from "@/components/image-upload"

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number",
  }),
  categoryId: z.string().min(1, {
    message: "Please select a category",
  }),
  thumbnail: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema> & { id?: string }

interface CourseFormProps {
  initialData?: FormValues
  categories: { id: string; name: string }[]
}

export function CourseForm({ initialData, categories }: CourseFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      price: 0,
      categoryId: "",
      thumbnail: "",
    },
  })

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true)

      const url = initialData ? `/api/courses/${initialData.id}` : "/api/courses"

      const method = initialData ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      const course = await response.json()

      toast.success(initialData ? "Course updated" : "Course created", {
        description: initialData
          ? "Your course has been updated successfully."
          : "Your course has been created successfully."
      })

      router.push(`/instructor/courses/${course.id}`)
      router.refresh()
    } catch {
      toast.error("Something went wrong", {
        description: "Failed to save course. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Thumbnail</FormLabel>
              <FormControl>
                <ImageUpload 
                  value={field.value || ""} 
                  onChange={field.onChange} 
                  disabled={isLoading}
                  aspectRatio="video"
                  maxSize={5}
                />
              </FormControl>
              <FormDescription>
                Upload a thumbnail image for your course. Recommended size: 1280x720px. Max file size: 5MB.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'Advanced Web Development'" {...field} />
                </FormControl>
                <FormDescription>The title of your course</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the category that best fits your course</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your course..." className="resize-none" rows={5} {...field} />
              </FormControl>
              <FormDescription>Provide a detailed description of your course</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (INR)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormDescription>Set the price for your course (0 for free)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Update Course" : "Create Course"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

