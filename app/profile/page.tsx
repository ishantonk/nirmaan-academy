import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { getAuthSession } from "@/lib/auth"
import { ProfileForm } from "@/components/profile/profile-form"
import { PasswordForm } from "@/components/profile/password-form"

export const metadata: Metadata = {
  title: "Profile | EduPlatform",
  description: "Manage your profile",
}

export default async function ProfilePage() {
  const session = await getAuthSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container py-8 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-6">
          <ProfileForm user={{ ...session.user, name: session.user.name ?? null }} />
        </TabsContent>
        <TabsContent value="password" className="mt-6">
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

