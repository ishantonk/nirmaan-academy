"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Check, X } from "lucide-react";
import { toast } from "sonner";

export function ProfileSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("John Doe");
    const [bio, setBio] = useState(
        "Software developer passionate about creating beautiful user experiences."
    );

    const handleSave = () => {
        toast("Profile updated", {
            description: "Your profile has been successfully updated.",
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                        onClick={() => {
                            toast("Upload photo", {
                                description:
                                    "Photo upload functionality would be implemented here.",
                            });
                        }}
                    >
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>
                <div className="space-y-1">
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="max-w-[300px]"
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleSave}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsEditing(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold">{name}</h2>
                            <Button
                                variant="ghost"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </Button>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <p className="text-muted-foreground">
                            john.doe@example.com
                        </p>
                        <Badge variant="secondary">Verified</Badge>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 160))}
                    placeholder="Tell us about yourself"
                    className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                    {bio.length}/160 characters
                </p>
            </div>
        </div>
    );
}
