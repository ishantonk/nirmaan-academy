"use client";

import { LoginInput, LoginSchema } from "@/lib/validators/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange", // Live validation feedback
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginInput) {
        setIsLoading(true);

        const signInResult = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            // callbackUrl,
        });

        setIsLoading(false);

        if (!signInResult?.ok) {
            return toast.error("Something went wrong", {
                description: "Your sign in request failed. Please try again.",
            });
        }

        // window.location.href = callbackUrl;
    }

    return (
        <form
            noValidate
            aria-label="Login Form"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-xs mx-auto"
        >
            <fieldset className="fieldset border-base-300 w-xs border p-4">
                <legend className="fieldset-legend text-2xl">
                    Welcome back
                </legend>

                <p className="text-sm text-base-content/70 mb-4">
                    Enter your email to sign in to your account
                </p>

                {/* Email */}
                <label htmlFor="email" className="label">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`input ${errors.email ? "input-error" : ""}`}
                    placeholder="Email"
                    autoComplete="email"
                />
                {errors.email && (
                    <span className="text-error flex items-center gap-2 px-1 text-[0.6875rem]">
                        {errors.email.message}
                    </span>
                )}

                {/* Password */}
                <label htmlFor="password" className="label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className={`input ${errors.password ? "input-error" : ""}`}
                    placeholder="Password"
                    autoComplete="current-password"
                />
                {errors.password && (
                    <span className="text-error flex items-center gap-2 px-1 text-[0.6875rem]">
                        {errors.password.message}
                    </span>
                )}

                <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className={`btn btn-primary mt-4 ${
                        !isValid ? "btn-disabled" : ""
                    }`}
                    aria-label="Sign In"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="loading loading-spinner loading-sm"></span>
                            "Signing In..."
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </button>

                <p className="text-center text-sm text-base-content/70 mt-4">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="link link-primary link-hover"
                    >
                        Sign Up
                    </Link>
                </p>
            </fieldset>
        </form>
    );
}
