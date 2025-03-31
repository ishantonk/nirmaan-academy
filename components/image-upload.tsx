"use client";

import { useState } from "react";
import Image from "next/image";
import { FileUploader } from "react-drag-drop-files";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Wrapper component to handle the overRide prop
interface UploadWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    overRide?: unknown; // We don't care about the type since we're filtering it out
}

const UploadWrapper = ({ children, ...props }: UploadWrapperProps) => {
    return <div {...props}>{children}</div>;
};

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
    aspectRatio?: "square" | "video" | "banner";
    maxSize?: number; // in MB
}

export function ImageUpload({
    value,
    onChange,
    disabled,
    aspectRatio = "video",
    maxSize = 5,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const validateFile = (file: File) => {
        // Check file type
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type", {
                description: "Please upload a JPG, PNG, or WebP image.",
            });
            return false;
        }

        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
            toast.error("File too large", {
                description: `Maximum file size is ${maxSize}MB.`,
            });
            return false;
        }

        return true;
    };

    const onDrop = async (file: File) => {
        if (!validateFile(file)) return;

        try {
            setIsUploading(true);

            // Create form data
            const formData = new FormData();
            formData.append("file", file);

            // Upload to your API
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Upload failed");
            }

            const data = await response.json();
            onChange(data.url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Upload failed", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Failed to upload image",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const aspectRatioClasses = {
        square: "aspect-square",
        video: "aspect-video",
        banner: "aspect-[21/9]",
    };

    return (
        <div className="w-full">
            {value ? (
                <div
                    className={`relative mx-auto w-full md:w-5/6 overflow-hidden rounded-md ${aspectRatioClasses[aspectRatio]}`}
                >
                    <Image
                        src={value}
                        alt="Upload preview"
                        fill
                        className="object-cover"
                    />
                    <Button
                        onClick={() => onChange("")}
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        type="button"
                        disabled={disabled}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <FileUploader
                    handleChange={onDrop}
                    name="file"
                    types={["JPG", "PNG", "WEBP"]}
                    disabled={disabled || isUploading}
                    maxSize={maxSize}
                >
                    <UploadWrapper className="flex flex-col items-center justify-center rounded-md border border-dashed p-12">
                        {isUploading ? (
                            <>
                                <Loader2 className="h-10 w-10 text-muted-foreground mb-2 animate-spin" />
                                <p className="text-sm text-muted-foreground">
                                    Uploading...
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Please wait
                                </p>
                            </>
                        ) : (
                            <>
                                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">
                                    Drag & drop an image here
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Supported formats: JPG, PNG, WebP (max{" "}
                                    {maxSize}MB)
                                </p>
                            </>
                        )}
                    </UploadWrapper>
                </FileUploader>
            )}
        </div>
    );
}
