import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type BlogProps = {
    id: number;
    title: string;
    slug: string;
    author: {
        name: string;
        role: string;
        href: string;
        imageUrl: string;
    };
    category: string;
    published_date: string;
    thumbnail: string;
    excerpt: string;
    tags: string[];
    is_featured: boolean;
};

export default function BlogCard({ blog }: { blog: BlogProps }) {
    const [showShare, setShowShare] = useState(false);

    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`;
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: blog.title,
                url: shareUrl,
            });
        } else {
            setShowShare(true);
            setTimeout(() => setShowShare(false), 3000);
        }
    };

    return (
        <div className={cn("group space-y-4")}>
            <Link
                href={`/blogs/${blog.slug}`}
                className="block overflow-hidden"
            >
                <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    width={200}
                    height={200}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
                />
            </Link>
            <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{blog.published_date}</span>
                    <Badge variant="outline" className="text-xs">
                        {blog.category}
                    </Badge>
                </div>
                <Link href={`/blog/${blog.slug}`} className="group/link">
                    <h2 className="text-lg font-semibold tracking-tight text-primary group-hover/link:text-neutral-800/80">
                        {blog.title}
                    </h2>
                </Link>
                <p className="text-muted-foreground line-clamp-2">
                    {blog.excerpt}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                    <Image
                        src={blog.author.imageUrl}
                        alt={blog.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <Link
                            href={blog.author.href}
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            {blog.author.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                            {blog.author.role}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleShare}
                        className="ml-auto"
                    >
                        <Share2 className="w-5 h-5 text-muted-foreground" />
                    </Button>
                </div>
                {showShare && (
                    <p className="text-sm text-muted-foreground mt-2">
                        Copy the link:{" "}
                        <span className="text-blue-600">{shareUrl}</span>
                    </p>
                )}
            </div>
        </div>
    );
}
