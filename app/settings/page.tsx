"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSection } from "@/components/settings/profile-section";
import { SecuritySection } from "@/components/settings/security-section";
import { PreferencesSection } from "@/components/settings/preferences-section";
import { AccountSection } from "@/components/settings/account-section";
import { Card } from "@/components/ui/card";
import Heading from "@/components/ui/heading";

export default function SettingsPage() {
    return (
        <div className="container mx-auto py-10">
            <Heading description="Manage your account settings and preferences.">
                Settings
            </Heading>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                <Card className="p-6">
                    <TabsContent value="profile" className="space-y-6">
                        <ProfileSection />
                    </TabsContent>

                    <TabsContent value="security" className="space-y-6">
                        <SecuritySection />
                    </TabsContent>

                    <TabsContent value="preferences" className="space-y-6">
                        <PreferencesSection />
                    </TabsContent>

                    <TabsContent value="account" className="space-y-6">
                        <AccountSection />
                    </TabsContent>
                </Card>
            </Tabs>
        </div>
    );
}
