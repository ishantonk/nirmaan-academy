"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: RegisterFormValues) => {
        setError(null);
        try {
            console.log("Logging in with:", data);
            // Add authentication logic here (e.g., API call)
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    className="mx-auto h-20 w-auto"
                    width={200}
                    height={200}
                    src="/logo.png"
                    alt="Nirmaan Academy"
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label
                        htmlFor="name"
                        className="block text-sm/6 font-medium"
                    >
                        Name
                    </Label>
                    <div className="mt-2">
                        <Input
                            type="text"
                            id="name"
                            required
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-site-primary sm:text-sm/6"
                            {...register("name")}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div>
                    <Label
                        htmlFor="email"
                        className="block text-sm/6 font-medium"
                    >
                        Email address
                    </Label>
                    <div className="mt-2">
                        <Input
                            type="email"
                            id="email"
                            required
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-site-primary sm:text-sm/6"
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <Label
                            htmlFor="password"
                            className="block text-sm/6 font-medium"
                        >
                            Password
                        </Label>
                    </div>
                    <div className="mt-2">
                        <Input
                            type="password"
                            id="password"
                            required
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-site-primary sm:text-sm/6"
                            {...register("password")}
                        />
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <Label
                            htmlFor="confirm_password"
                            className="block text-sm/6 font-medium"
                        >
                            Confirm password
                        </Label>
                    </div>
                    <div className="mt-2">
                        <Input
                            type="password"
                            id="confirm_password"
                            required
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-site-primary sm:text-sm/6"
                            {...register("confirm_password")}
                        />
                    </div>
                    {errors.confirm_password && (
                        <p className="text-red-500 text-sm">
                            {errors.confirm_password.message}
                        </p>
                    )}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
                Don&apos;t have an account yet?{" "}
                <Link
                    href="#"
                    className="font-semibold text-site-primary hover:text-site-secondary"
                >
                    Create an account
                </Link>
            </p>
        </div>
    );
}
