"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LogOut, Shield } from "lucide-react";
import { toast } from "sonner";

export function SecuritySection() {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input type="password" id="current-password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input type="password" id="new-password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input type="password" id="confirm-password" />
                </div>
                <Button
                    onClick={() => {
                        toast("Password updated", {
                            description:
                                "Your password has been successfully updated.",
                        });
                    }}
                >
                    Update Password
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Two-factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                        </p>
                    </div>
                    <Switch
                        checked={twoFactor}
                        onCheckedChange={setTwoFactor}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Active Sessions</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">
                                Last active: Just now
                            </p>
                        </div>
                        <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                            <p className="font-medium">Chrome on MacBook Pro</p>
                            <p className="text-sm text-muted-foreground">
                                Last active: 2 days ago
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                toast("Session terminated", {
                                    description:
                                        "The selected session has been logged out.",
                                });
                            }}
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
