"use client";

import { RegisterInput, RegisterSchema } from "@/lib/validators/auth/register";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterInput>({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange", // Live validation feedback
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: RegisterInput) => {
        console.log("Form Submitted:", values);
        // TODO: Call server action or API
    };

    return (
        <form
            noValidate
            aria-label="Registration Form"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-xs mx-auto"
        >
            <fieldset className="fieldset border-base-300 w-xs border p-4">
                <legend className="fieldset-legend text-2xl">
                    Create an account
                </legend>

                <p className="text-sm text-base-content/70 mb-4">
                    Enter your details below to create your account
                </p>

                {/* Full Name */}
                <label htmlFor="name" className="label">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`input ${errors.name ? "input-error" : ""}`}
                    placeholder="Your full name"
                    autoComplete="name"
                />
                {errors.name && (
                    <span className="text-error flex items-center gap-2 px-1 text-[0.6875rem]">
                        {errors.name.message}
                    </span>
                )}

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
                    autoComplete="new-password"
                />
                {errors.password && (
                    <span className="text-error flex items-center gap-2 px-1 text-[0.6875rem]">
                        {errors.password.message}
                    </span>
                )}

                {/* Confirm Password */}
                <label htmlFor="confirm-password" className="label">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirm-password"
                    {...register("confirmPassword")}
                    className={`input ${
                        errors.confirmPassword ? "input-error" : ""
                    }`}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                />
                {errors.confirmPassword && (
                    <span className="text-error items-center gap-2 px-1 text-[0.6875rem]">
                        {errors.confirmPassword.message}
                    </span>
                )}

                <button
                    type="submit"
                    disabled={!isValid}
                    className={`btn btn-primary mt-4 ${
                        !isValid ? "btn-disabled" : ""
                    }`}
                    aria-label="Create an account"
                >
                    Create Account
                </button>

                <p className="text-center text-sm text-base-content/70 mt-4">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="link link-primary link-hover"
                    >
                        Sign In
                    </Link>
                </p>
            </fieldset>
        </form>
    );
}
