"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

export function PreferencesSection() {
    const { theme, setTheme } = useTheme();
    const [notifications, setNotifications] = useState({
        marketing: true,
        security: true,
        updates: true,
    });

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                        value={theme}
                        onValueChange={(value) => setTheme(value)}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Marketing emails</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive emails about new products, features, and
                                more.
                            </p>
                        </div>
                        <Switch
                            checked={notifications.marketing}
                            onCheckedChange={(checked) =>
                                setNotifications((prev) => ({
                                    ...prev,
                                    marketing: checked,
                                }))
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Security alerts</Label>
                            <p className="text-sm text-muted-foreground">
                                Get notified about security updates and unusual
                                activity.
                            </p>
                        </div>
                        <Switch
                            checked={notifications.security}
                            onCheckedChange={(checked) =>
                                setNotifications((prev) => ({
                                    ...prev,
                                    security: checked,
                                }))
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Account updates</Label>
                            <p className="text-sm text-muted-foreground">
                                Get notified about account-related changes.
                            </p>
                        </div>
                        <Switch
                            checked={notifications.updates}
                            onCheckedChange={(checked) =>
                                setNotifications((prev) => ({
                                    ...prev,
                                    updates: checked,
                                }))
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="it">Italian</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
