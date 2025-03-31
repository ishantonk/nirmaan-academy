import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Calendar, Share2, BookmarkPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { isValidUrl } from "@/lib/utils";

type PostWithRelations = Post & {
    author: {
        name: string | null;
        bio: string | null;
        image: string | null;
    };
    category: {
        name: string;
        slug: string;
        description: string | null;
    };
    tags: Array<{
        id: string;
        name: string;
        slug: string;
    }>;
};

interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

async function getBlogPost(slug: string): Promise<PostWithRelations | null> {
    const post = await prisma.post.findUnique({
        where: {
            slug,
            status: "PUBLISHED",
        },
        include: {
            author: {
                select: {
                    name: true,
                    bio: true,
                    image: true,
                },
            },
            category: {
                select: {
                    name: true,
                    slug: true,
                    description: true,
                },
            },
            tags: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });

    return post as PostWithRelations | null;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const post = await getBlogPost(props.params.slug);

    if (!post) {
        return {
            title: "Blog Post Not Found",
            description: "The blog post you're looking for doesn't exist.",
        };
    }

    return {
        title: post.metaTitle || `${post.title} - Nirmaan Academy Blog`,
        description: post.metaDescription || post.excerpt || "",
        openGraph: {
            title: post.title,
            description: post.excerpt || "",
            type: "article",
            publishedTime: post.publishedAt?.toISOString(),
            authors: post.author.name ? [post.author.name] : undefined,
            images: [
                {
                    url: post.featuredImage || "/images/blog/placeholder.jpg",
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt || "",
            images: [post.featuredImage || "/images/blog/placeholder.jpg"],
        },
    };
}

export default async function BlogPost(props: PageProps) {
    const post = await getBlogPost(props.params.slug);

    if (!post) {
        notFound();
    }

    const featuredImage = isValidUrl(
        post.featuredImage ? post.featuredImage : ""
    )
        ? post.featuredImage
        : null;

    return (
        <article className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                {featuredImage ? (
                    <Image
                        src={featuredImage}
                        alt={post.featuredImageAlt || post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">
                            No thumbnail
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto max-w-4xl">
                        <Badge variant="secondary" className="mb-4">
                            {post.category.name}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={post.author.image || undefined}
                                    />
                                    <AvatarFallback>
                                        {post.author.name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p className="font-medium text-foreground">
                                        {post.author.name}
                                    </p>
                                    <p className="text-xs">{post.author.bio}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <time
                                    dateTime={post.publishedAt?.toISOString()}
                                >
                                    {post.publishedAt &&
                                        formatDate(post.publishedAt)}
                                </time>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTimeMinutes} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto max-w-4xl py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8">
                    <div className="space-y-8">
                        {/* Article Content */}
                        <div
                            className="prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="pt-8">
                                <h2 className="text-lg font-semibold mb-4">
                                    Related Topics
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag.id} variant="outline">
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Author Bio */}
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        src={post.author.image || undefined}
                                    />
                                    <AvatarFallback>
                                        {post.author.name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">
                                        {post.author.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {post.author.bio}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="sticky top-24">
                            <div className="flex flex-col gap-4">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                >
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                >
                                    <BookmarkPlus className="h-4 w-4" />
                                    Save
                                </Button>
                                <Separator />
                                <div className="text-sm text-muted-foreground">
                                    <p>Published in</p>
                                    <p className="font-medium text-foreground mt-1">
                                        {post.category.name}
                                    </p>
                                    {post.category.description && (
                                        <p className="mt-2 text-xs">
                                            {post.category.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
