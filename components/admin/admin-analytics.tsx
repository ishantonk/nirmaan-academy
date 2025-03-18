"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

export function AdminAnalytics() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("week")

  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["admin-analytics", period],
    queryFn: async () => {
      const response = await fetch(`/api/admin/analytics?period=${period}`)
      if (!response.ok) {
        throw new Error("Failed to fetch analytics")
      }
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Loading analytics data...</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p>Loading...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>View revenue and enrollment analytics</CardDescription>
          </div>
          <Tabs value={period} onValueChange={(value) => setPeriod(value as "week" | "month" | "year")}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            enrollments: {
              label: "Enrollments",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="var(--color-revenue)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--color-enrollments)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar yAxisId="left" dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
              <Bar yAxisId="right" dataKey="enrollments" fill="var(--color-enrollments)" name="Enrollments" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

