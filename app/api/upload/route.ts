import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/auth"
import { put } from "@vercel/blob"
import { generateRandomString } from "@/lib/utils"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file type
    const fileType = file.type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "application/pdf",
    ]

    // Check if the file type is valid
    if (!validTypes.includes(fileType)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    // Check file size (10MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 })
    }

    // Generate a unique filename
    const fileName = `${generateRandomString(10)}-${file.name.replace(/\s+/g, "-")}`

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
    })

    return NextResponse.json({
      url: blob.url,
      success: true,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

