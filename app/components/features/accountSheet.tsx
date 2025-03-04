"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "lucide-react";

export default function AccountSheet() {
    return (
        <Sheet>
            <SheetTrigger>
                <button className="flex flex-col items-center justify-center px-0.5 pb-1 gap-0.5 cursor-pointer w-full hover:text-neutral-500 transition-colors ease-in duration-150">
                    <span>
                        <User />
                    </span>
                    <span>Account</span>
                </button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Sign in</SheetTitle>
                    <SheetDescription>
                        Sign in to your account to access your profile and settings.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4 mx-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Button className="col-span-4">Sign in</Button>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="col-span-2 flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>
                        <div className="col-span-2 text-right">
                            <Button variant="link">Forgot password?</Button>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                    <SheetDescription>
                        Don&apos;t have an account yet? Create one now.
                    </SheetDescription>
                    <Button className="w-full">Create an account</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
