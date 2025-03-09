"use client";

import Container from "../components/container";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function AccountPage() {
    return (
        <main>
            <Container>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <Image
                                className="mx-auto h-10 w-auto"
                                width={40}
                                height={40}
                                src="/logo.png"
                                alt="Nirmaan Academy"
                            />
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                Sign in
                            </h2>
                            <p className="mt-2 text-sm text-center tracking-tight text-neutral-600">
                                Sign in to your account to access your profile
                                and settings.
                            </p>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form
                                className="space-y-6"
                                action="#"
                                method="POST"
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-site-primary sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a
                                                href="#"
                                                className="font-semibold text-site-primary hover:text-site-secondary"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Input
                                            type="password"
                                            name="password"
                                            id="password"
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-site-primary sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-site-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-site-setext-site-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-site-primary"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm/6 text-gray-500">
                                Don&apos;t have an account yet? <a
                                    href="#"
                                    className="font-semibold text-site-primary hover:text-site-secondary"
                                >
                                    Create an account
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
