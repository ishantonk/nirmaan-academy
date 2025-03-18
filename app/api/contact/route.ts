import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true for 465, false for other ports like 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    // Validate the request body
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Prepare email content
    const adminEmail = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
      `,
    }

    // Send email to admin
    await transporter.sendMail(adminEmail)

    // Send auto-reply to the user
    const autoReplyEmail = {
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: "Thank you for contacting us",
      text: `
Dear ${name},

Thank you for contacting us. We have received your message and will get back to you as soon as possible.

Best regards,
Your Team
      `,
      html: `
<h2>Thank you for contacting us</h2>
<p>Dear ${name},</p>
<p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
<p>Best regards,<br>Your Team</p>
      `,
    }

    // Send auto-reply
    await transporter.sendMail(autoReplyEmail)

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
} 