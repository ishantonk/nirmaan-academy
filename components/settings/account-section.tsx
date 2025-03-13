"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function AccountSection() {
    const [isDeactivated, setIsDeactivated] = useState(false);

    const handleExportData = () => {
        toast("Data export initiated", {
            description: "Your data export will be ready for download shortly.",
        });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Export Personal Data</h3>
                <p className="text-sm text-muted-foreground">
                    Download a copy of your personal data, including your
                    profile information and activity history.
                </p>
                <Button onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                </Button>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Status</h3>
                <div className="flex items-center gap-4">
                    <Button
                        variant={isDeactivated ? "outline" : "secondary"}
                        onClick={() => {
                            setIsDeactivated(!isDeactivated);
                            toast(
                                isDeactivated
                                    ? "Account reactivated"
                                    : "Account deactivated",
                                {
                                    description: isDeactivated
                                        ? "Your account has been reactivated successfully."
                                        : "Your account has been temporarily deactivated.",
                                }
                            );
                        }}
                    >
                        {isDeactivated
                            ? "Reactivate Account"
                            : "Deactivate Account"}
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    {isDeactivated
                        ? "Your account is currently deactivated. Reactivate to regain access."
                        : "Temporarily disable your account. You can reactivate it at any time."}
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-destructive">
                    Danger Zone
                </h3>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Delete Account
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove all
                                your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    toast("Account deleted", {
                                        description:
                                            "Your account has been permanently deleted.",
                                    });
                                }}
                            >
                                Delete Account
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
