import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateBlogPostInput,
  CreateBlogPostSchema,
  UpdateBlogPostInput,
  UpdateBlogPostSchema,
  BlogPostListQueryInput,
  BlogPostListQuerySchema,
} from "../validators";

/** Common select shape */
const blogPostSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  featuredImage: true,
  featuredImageAlt: true,
  publishedAt: true,
  readTimeMinutes: true,
  status: true,
  metaTitle: true,
  metaKeywords: true,
  metaDescription: true,
  authorId: true,
  categoryId: true,
  author: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.BlogPostSelect;

/** DTO Type */
export type BlogPostDTO = Prisma.BlogPostGetPayload<{
  select: typeof blogPostSelect;
}>;

/** Create BlogPost */
export async function createBlogPost(input: unknown): Promise<BlogPostDTO> {
  const data = parseOrThrow<CreateBlogPostInput>(CreateBlogPostSchema, input);

  try {
    const created = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        featuredImageAlt: data.featuredImageAlt,
        publishedAt: data.publishedAt,
        readTimeMinutes: data.readTimeMinutes,
        status: data.status ?? "DRAFT",
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
        authorId: data.authorId,
        categoryId: data.categoryId,
      },
      select: blogPostSelect,
    });
    return created;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Author or category not found.");
      }
    }
    throw error;
  }
}

/** Update BlogPost */
export async function updateBlogPost(input: unknown): Promise<BlogPostDTO> {
  const data = parseOrThrow<UpdateBlogPostInput>(UpdateBlogPostSchema, input);

  const { id, ...rest } = data;

  try {
    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(rest.title !== undefined && { title: rest.title }),
        ...(rest.slug !== undefined && { slug: rest.slug }),
        ...(rest.excerpt !== undefined && { excerpt: rest.excerpt }),
        ...(rest.content !== undefined && { content: rest.content }),
        ...(rest.featuredImage !== undefined && {
          featuredImage: rest.featuredImage,
        }),
        ...(rest.featuredImageAlt !== undefined && {
          featuredImageAlt: rest.featuredImageAlt,
        }),
        ...(rest.publishedAt !== undefined && {
          publishedAt: rest.publishedAt,
        }),
        ...(rest.readTimeMinutes !== undefined && {
          readTimeMinutes: rest.readTimeMinutes,
        }),
        ...(rest.status !== undefined && { status: rest.status }),
        ...(rest.metaTitle !== undefined && { metaTitle: rest.metaTitle }),
        ...(rest.metaKeywords !== undefined && {
          metaKeywords: rest.metaKeywords,
        }),
        ...(rest.metaDescription !== undefined && {
          metaDescription: rest.metaDescription,
        }),
        ...(rest.authorId !== undefined && { authorId: rest.authorId }),
        ...(rest.categoryId !== undefined && { categoryId: rest.categoryId }),
      },
      select: blogPostSelect,
    });
    return updated;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Blog post not found.");
      }
    }
    throw error;
  }
}

/** Delete BlogPost */
export async function deleteBlogPost(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.blogPost.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Blog post not found.");
    }
    throw error;
  }
}

/** Get BlogPost by ID */
export async function getBlogPostById(id: string): Promise<BlogPostDTO | null> {
  return prisma.blogPost.findUnique({
    where: { id },
    select: blogPostSelect,
  });
}

/** Get BlogPost by ID */
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostDTO | null> {
  return prisma.blogPost.findUnique({
    where: { slug },
    select: blogPostSelect,
  });
}

/** List BlogPosts with filters + pagination */
export async function listBlogPosts(input: unknown): Promise<{
  items: BlogPostDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const params = parseOrThrow<BlogPostListQueryInput>(
    BlogPostListQuerySchema,
    input
  );

  const where: Prisma.BlogPostWhereInput = {
    ...(params.status && { status: params.status }),
    ...(params.categoryId && { categoryId: params.categoryId }),
    ...(params.authorId && { authorId: params.authorId }),
    ...(params.q && {
      OR: [
        { title: { contains: params.q, mode: "insensitive" } },
        { slug: { contains: params.q, mode: "insensitive" } },
        { content: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.blogPost.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: blogPostSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Publish BlogPost (one-way action: sets status to PUBLISHED) */
export async function publishBlogPost(slug: string): Promise<BlogPostDTO> {
  try {
    const updated = await prisma.blogPost.update({
      where: { slug },
      data: {
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
      select: blogPostSelect,
    });
    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Blog post not found.");
    }
    throw error;
  }
}
