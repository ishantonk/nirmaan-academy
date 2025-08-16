"use client";

import { Moon, ShoppingCart, Sun } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ActionMenu() {
    const { data: session } = useSession();

    return (
        <div className="flex flex-row items-center justify-end space-x-2">
            <button className="btn btn-ghost btn-square">
                <ShoppingCart className="size-5" />
            </button>
            <label className="btn btn-ghost btn-square swap swap-rotate">
                <input type="checkbox" />
                <Sun className="size-5 swap-off" />
                <Moon className="size-5 swap-on" />
            </label>
            {session ? (
                <Link href={"/profile"} className="btn btn-ghost">
                    Profile
                </Link>
            ) : (
                <div className="space-x-2">
                    <Link href={"/login"} className="btn btn-ghost">
                        Login
                    </Link>
                    <Link href={"/register"} className="btn btn-accent">
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
}
