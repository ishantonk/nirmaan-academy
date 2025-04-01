import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"
import { brandName } from "@/data/contact-info"

export const metadata: Metadata = {
  title: "Login | " + brandName,
  description: `Login to your ${brandName} account`,
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center mx-auto px-4">
      <div className="mx-auto flex flex-col justify-center space-y-6 w-full sm:w-96">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

