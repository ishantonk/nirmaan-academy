import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Clock, User, Calendar } from "lucide-react"
import { prisma } from "@/lib/prisma"

interface PageProps {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string) {
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
  })

  return post
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: post.metaTitle || `${post.title} - Nirmaan Academy Blog`,
    description: post.metaDescription || post.excerpt,
  }
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Image */}
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <img
            src={post.featuredImage || "/images/blog/placeholder.jpg"}
            alt={post.featuredImageAlt || post.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Header */}
        <div className="space-y-4 text-center mb-8">
          <div className="text-sm text-primary font-medium">{post.category.name}</div>
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author.name}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.publishedAt?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTimeMinutes} min read
            </div>
          </div>
        </div>

        {/* Content */}
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
} 