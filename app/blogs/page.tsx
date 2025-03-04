import Image from "next/image";

const posts = [
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
            imageUrl:
                "/1.png",
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
            imageUrl:
                "/2.png",
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
            imageUrl:
                "/3.png",
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

export default function BlogsPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                        From the blog
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="flex max-w-xl flex-col items-start justify-between"
                        >
                            <div className="flex items-center gap-x-4 text-xs">
                                <time
                                    dateTime={post.datetime}
                                    className="text-gray-500"
                                >
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
                                    <p className="text-gray-600">
                                        {post.author.role}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
