"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ImageOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps
    extends Omit<React.ComponentProps<typeof Image>, "onError" | "onLoad"> {
    fallbackSrc?: string;
    showLoading?: boolean;
    loadingClassName?: string;
    errorClassName?: string;
    containerClassName?: string;
}

export default function ResponsiveImage({
    className,
    src,
    alt,
    fallbackSrc,
    showLoading = true,
    loadingClassName,
    errorClassName,
    containerClassName,
    fill = true,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority = false,
    quality = 75,
    placeholder = "blur",
    blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
    ...props
}: ResponsiveImageProps) {
    const [imageState, setImageState] = useState<
        "loading" | "loaded" | "error"
    >("loading");
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleImageLoad = useCallback(() => {
        setImageState("loaded");
    }, []);

    const handleImageError = useCallback(() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            setImageState("loading");
        } else {
            setImageState("error");
        }
    }, [fallbackSrc, currentSrc]);

    // Error state
    if (imageState === "error") {
        return (
            <div
                className={cn(
                    "flex items-center justify-center gap-x-2 w-full h-full bg-base-200 text-sm text-base-content rounded-lg border border-base-300",
                    errorClassName,
                    containerClassName
                )}
                role="img"
                aria-label={alt}
            >
                <ImageOff className="size-5 text-base-content/60" />
                <span className="text-base-content/80">No thumbnail</span>
            </div>
        );
    }

    return (
        <div className={cn("relative w-full h-full", containerClassName)}>
            {/* Loading overlay */}
            {showLoading && imageState === "loading" && (
                <div
                    className={cn(
                        "absolute inset-0 z-10 flex items-center justify-center bg-base-200 rounded-lg",
                        loadingClassName
                    )}
                >
                    <Loader2 className="size-6 animate-spin text-base-content/60" />
                </div>
            )}

            {/* Image */}
            <Image
                {...props}
                src={currentSrc}
                alt={alt}
                fill={fill}
                sizes={sizes}
                priority={priority}
                quality={quality}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
                className={cn(
                    "object-cover object-center transition-opacity duration-300",
                    imageState === "loaded" ? "opacity-100" : "opacity-0",
                    className
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                    ...props.style,
                }}
            />
        </div>
    );
}
