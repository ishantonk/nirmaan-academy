import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminUserTable } from "@/components/admin/admin-user-table"
import { AdminCourseTable } from "@/components/admin/admin-course-table"
import { AdminOrderTable } from "@/components/admin/admin-order-table"
import { AdminAnalytics } from "@/components/admin/admin-analytics"

export default async function AdminDashboardPage() {
  const session = await getAuthSession()

  if (!session || session.user.role !== "ADMIN") {
    redirect("/")
  }

  // Get counts for dashboard
  const userCount = await prisma.user.count()
  const courseCount = await prisma.course.count()
  const enrollmentCount = await prisma.enrollment.count()
  const orderCount = await prisma.order.count({
    where: {
      status: "COMPLETED",
    },
  })

  // Get total revenue
  const revenue = await prisma.order.aggregate({
    where: {
      status: "COMPLETED",
    },
    _sum: {
      amount: true,
    },
  })

  const totalRevenue = revenue._sum.amount || 0

  return (
    <div className="container py-8 mx-auto px-4">
      <DashboardHeader heading="Admin Dashboard" text="Manage users, courses, and view analytics." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollmentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <AdminAnalytics />
      </div>

      <div className="mt-8">
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="mt-4">
            <AdminUserTable />
          </TabsContent>
          <TabsContent value="courses" className="mt-4">
            <AdminCourseTable />
          </TabsContent>
          <TabsContent value="orders" className="mt-4">
            <AdminOrderTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

