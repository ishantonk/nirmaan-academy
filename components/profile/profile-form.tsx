"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  bio: z.string().optional(),
  image: z.string().optional(),
})

interface ProfileFormProps {
  user: {
    name: string;
    bio?: string;
    image?: string;
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(user.image || null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      image: user.image || "",
    },
  })

  const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload avatar")
      }

      return response.json()
    },
    onSuccess: (data) => {
      form.setValue("image", data.url)
      setAvatarPreview(data.url)
      toast.success("Avatar uploaded", {
        description: "Your avatar has been uploaded successfully.",
      })
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Failed to upload avatar",
      })
    },
  })

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to update profile")
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("Profile updated", {
        description: "Your profile has been updated successfully.",
      })
      router.refresh()
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Failed to update profile",
      })
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateProfile(values)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadAvatar = () => {
    if (avatarFile) {
      uploadAvatar(avatarFile)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full border">
                        <Image
                          src={avatarPreview || "/placeholder.svg?height=96&width=96"}
                          alt="Avatar preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Input type="file" accept="image/*" onChange={handleAvatarChange} />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleUploadAvatar}
                          disabled={!avatarFile || isUploading}
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Upload
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <FormDescription>Upload a profile picture. Recommended size: 200x200 pixels.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about yourself"
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a short bio about yourself. This will be visible on your public profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

