import { Metadata } from "next";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { brandName } from "@/data/contact-info";
import Image from "next/image";
import { isValidUrl } from "@/lib/utils";
import { Post } from "@prisma/client";

export const metadata: Metadata = {
    title: "Blog - " + brandName,
    description:
        "Latest articles, tutorials, and updates from Nirmaan Academy.",
};

async function getBlogPosts() {
    const posts = await prisma.post.findMany({
        where: {
            status: "PUBLISHED",
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
            category: {
                select: {
                    name: true,
                    slug: true,
                },
            },
        },
        orderBy: {
            publishedAt: "desc",
        },
    });

    return posts;
}

export default async function BlogsPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Our Blog</h1>
                <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                    Stay updated with the latest insights, tutorials, and news
                    in Business Law, Company Law, and more.
                </p>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} {...post} />
                ))}
            </div>
        </div>
    );
}

interface PostCardProps extends Post {
    author: {
        name: string | null;
    };
    category: {
        name: string;
        slug: string;
    };
}

function PostCard(post: PostCardProps) {
    const featuredImage = isValidUrl(
        post.featuredImage ? post.featuredImage : ""
    )
        ? post.featuredImage
        : null;
    return (
        <Card key={post.id} className="flex flex-col overflow-hidden py-0 pb-6">
            <div className="relative h-48 w-full">
                {featuredImage ? (
                    <Image
                        src={featuredImage}
                        alt={post.featuredImageAlt || post.title}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">
                            No thumbnail
                        </span>
                    </div>
                )}
            </div>
            <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                    {post.category.name}
                </div>
                <Link href={`/blogs/${post.slug}`} className="group">
                    <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>
                </Link>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="mt-auto">
                <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author.name}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTimeMinutes} min read
                        </div>
                    </div>
                    <Button asChild className="w-full">
                        <Link href={`/blogs/${post.slug}`}>Read More</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
