"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "./container";
import Image from "next/image";

interface Author {
    name: string;
    role: string;
    href: string;
    imageUrl: string;
}

interface Category {
    title: string;
    href: string;
}

interface Post {
    id: number;
    title: string;
    href: string;
    description: string;
    date: string;
    datetime: string;
    category: Category;
    author: Author;
}

const posts: Post[] = [
    {
        id: 1,
        title: "Boost your conversion rate",
        href: "#",
        description:
            "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
        date: "Mar 16, 2020",
        datetime: "2020-03-16",
        category: { title: "Marketing", href: "#" },
        author: {
            name: "Michael Foster",
            role: "Co-Founder / CTO",
            href: "#",
            imageUrl: "/1.png",
        },
    },
    {
        id: 2,
        title: "How to use SEO to drive traffic",
        href: "#",
        description:
            "Learn the best practices for optimizing your website for search engines and driving more traffic to your site.",
        date: "Apr 10, 2021",
        datetime: "2021-04-10",
        category: { title: "SEO", href: "#" },
        author: {
            name: "Sarah Connor",
            role: "SEO Specialist",
            href: "#",
            imageUrl: "/2.png",
        },
    },
    {
        id: 3,
        title: "The ultimate guide to email marketing",
        href: "#",
        description:
            "Discover the most effective strategies for building and growing your email list, and learn how to create compelling email campaigns.",
        date: "May 22, 2021",
        datetime: "2021-05-22",
        category: { title: "Email Marketing", href: "#" },
        author: {
            name: "John Doe",
            role: "Marketing Manager",
            href: "#",
            imageUrl: "/3.png",
        },
    },
    {
        id: 4,
        title: "Social Media Marketing Tips",
        href: "#",
        description:
            "Explore the best practices for promoting your business on social media platforms and engaging with your audience.",
        date: "Jun 15, 2021",
        datetime: "2021-06-15",
        category: { title: "Social Media", href: "#" },
        author: {
            name: "Jane Smith",
            role: "Social Media Manager",
            href: "#",
            imageUrl: "/4.png",
        },
    },
    {
        id: 5,
        title: "Content Marketing Strategies",
        href: "#",
        description:
            "Learn how to create and distribute valuable content to attract and retain a clearly defined audience.",
        date: "Jul 20, 2021",
        datetime: "2021-07-20",
        category: { title: "Content Marketing", href: "#" },
        author: {
            name: "Alice Johnson",
            role: "Content Strategist",
            href: "#",
            imageUrl: "/5.png",
        },
    },
];

export default function LatestBlogs() {
    return (
        <section>
            <Container>
                <div className="flex flex-col justify-center items-start gap-4 mx-4 md:mx-8 lg:mx-16">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
                        Latest Blogs
                    </h1>
                    <p className="text-lg text-gray-600 mb-16 max-w-3xl text-start">
                        Discover how our services have made a difference in the
                        lives of our clients.
                    </p>

                    <BlogCardCarousel />
                </div>
            </Container>
        </section>
    );
}

export function BlogCardCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {posts.map((post) => (
                    <CarouselItem
                        key={post.id}
                        className="basis-full lg:basis-1/3"
                    >
                        <BlogCard post={post} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

interface BlogCardProp {
    post: Post;
}

export function BlogCard({ post }: BlogCardProp) {
    return (
        <article
            key={post.id}
            className="flex max-w-xl flex-col items-start justify-between mx-4"
        >
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                </time>
                <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                    {post.category.title}
                </a>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                    </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                    {post.description}
                </p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
                <Image
                    alt=""
                    src={post.author.imageUrl}
                    width={32}
                    height={32}
                    className="size-10 rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                        <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                        </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                </div>
            </div>
        </article>
    );
}
