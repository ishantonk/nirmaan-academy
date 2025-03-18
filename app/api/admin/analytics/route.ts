import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const period = url.searchParams.get("period") || "week"

    let data = []

    if (period === "week") {
      // Get data for the last 7 days
      data = await getWeeklyData()
    } else if (period === "month") {
      // Get data for the last 30 days
      data = await getMonthlyData()
    } else if (period === "year") {
      // Get data for the last 12 months
      data = await getYearlyData()
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function getWeeklyData() {
  const today = new Date()
  const data = []

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)

    // Get revenue for this day
    const revenue = await prisma.order.aggregate({
      where: {
        status: "COMPLETED",
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
      _sum: {
        amount: true,
      },
    })

    // Get enrollments for this day
    const enrollments = await prisma.enrollment.count({
      where: {
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
    })

    data.push({
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      revenue: Number(revenue._sum.amount || 0),
      enrollments,
    })
  }

  return data
}

async function getMonthlyData() {
  const today = new Date()
  const data = []

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)

    // Get revenue for this day
    const revenue = await prisma.order.aggregate({
      where: {
        status: "COMPLETED",
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
      _sum: {
        amount: true,
      },
    })

    // Get enrollments for this day
    const enrollments = await prisma.enrollment.count({
      where: {
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
    })

    // Only add every 3rd day to avoid cluttering the chart
    if (i % 3 === 0) {
      data.push({
        name: `${date.getMonth() + 1}/${date.getDate()}`,
        revenue: Number(revenue._sum.amount || 0),
        enrollments,
      })
    }
  }

  return data
}

async function getYearlyData() {
  const today = new Date()
  const data = []

  for (let i = 11; i >= 0; i--) {
    const date = new Date(today)
    date.setMonth(date.getMonth() - i)
    date.setDate(1)
    date.setHours(0, 0, 0, 0)

    const nextDate = new Date(date)
    nextDate.setMonth(nextDate.getMonth() + 1)

    // Get revenue for this month
    const revenue = await prisma.order.aggregate({
      where: {
        status: "COMPLETED",
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
      _sum: {
        amount: true,
      },
    })

    // Get enrollments for this month
    const enrollments = await prisma.enrollment.count({
      where: {
        createdAt: {
          gte: date,
          lt: nextDate,
        },
      },
    })

    data.push({
      name: date.toLocaleDateString("en-US", { month: "short" }),
      revenue: Number(revenue._sum.amount || 0),
      enrollments,
    })
  }

  return data
}

