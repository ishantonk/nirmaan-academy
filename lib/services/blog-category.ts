import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateBlogCategoryInput,
  CreateBlogCategorySchema,
  UpdateBlogCategoryInput,
  UpdateBlogCategorySchema,
  BlogCategoryListQueryInput,
  BlogCategoryListQuerySchema,
} from "../validators";

/** Common select shape */
const blogCategorySelect = {
  id: true,
  name: true,
  description: true,
  slug: true,
  isPopular: true,
  status: true,
  subcategories: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  metaTitle: true,
  metaKeywords: true,
  metaDescription: true,
  parentId: true,
  parent: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.BlogCategorySelect;

/** DTO Type */
export type BlogCategoryDTO = Prisma.BlogCategoryGetPayload<{
  select: typeof blogCategorySelect;
}>;

/** Create BlogCategory */
export async function createBlogCategory(
  input: unknown
): Promise<BlogCategoryDTO> {
  const data = parseOrThrow<CreateBlogCategoryInput>(
    CreateBlogCategorySchema,
    input
  );

  try {
    const created = await prisma.blogCategory.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description ?? null,
        isPopular: data.isPopular ?? false,
        status: data.status ?? "ACTIVE",
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
        parentId: data.parentId ?? null,
      },
      select: blogCategorySelect,
    });
    return created;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Parent category not found.");
      }
    }
    throw error;
  }
}

/** Update BlogCategory (Partial) */
export async function updateBlogCategory(
  input: unknown
): Promise<BlogCategoryDTO> {
  const data = parseOrThrow<UpdateBlogCategoryInput>(
    UpdateBlogCategorySchema,
    input
  );

  const { id, ...rest } = data;

  try {
    const updated = await prisma.blogCategory.update({
      where: { id },
      data: {
        ...(rest.name !== undefined && { name: rest.name }),
        ...(rest.slug !== undefined && { slug: rest.slug }),
        ...(rest.description !== undefined && {
          description: rest.description,
        }),
        ...(rest.isPopular !== undefined && { isPopular: rest.isPopular }),
        ...(rest.metaTitle !== undefined && { metaTitle: rest.metaTitle }),
        ...(rest.metaKeywords !== undefined && {
          metaKeywords: rest.metaKeywords,
        }),
        ...(rest.metaDescription !== undefined && {
          metaDescription: rest.metaDescription,
        }),
        ...(rest.parentId !== undefined && { parentId: rest.parentId }),
      },
      select: blogCategorySelect,
    });
    return updated;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Blog category not found.");
      }
    }
    throw error;
  }
}

/** Delete BlogCategory */
export async function deleteBlogCategory(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.blogCategory.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Blog category not found.");
    }
    throw error;
  }
}

/** Get BlogCategory by ID */
export async function getBlogCategoryById(
  id: string
): Promise<BlogCategoryDTO | null> {
  return prisma.blogCategory.findUnique({
    where: { id },
    select: blogCategorySelect,
  });
}

/** Get Blog Category by slug */
export async function getBlogCategoryBySlug(
  slug: string
): Promise<BlogCategoryDTO | null> {
  return prisma.blogCategory.findUnique({
    where: { slug },
    select: blogCategorySelect,
  });
}

/** List BlogCategories with filters + pagination */
export async function listBlogCategories(input: unknown): Promise<{
  items: BlogCategoryDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const params = parseOrThrow<BlogCategoryListQueryInput>(
    BlogCategoryListQuerySchema,
    input
  );

  const where: Prisma.BlogCategoryWhereInput = {
    ...(params.status && { status: params.status }),
    ...(params.isPopular !== undefined && { isPopular: params.isPopular }),
    ...(params.parentId && { parentId: params.parentId }),
    ...(params.q && {
      OR: [
        { name: { contains: params.q, mode: "insensitive" } },
        { slug: { contains: params.q, mode: "insensitive" } },
        { description: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.blogCategory.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: blogCategorySelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Toggle popular flag */
export async function setPopularBlogCategory(
  id: string,
  isPopular: boolean
): Promise<BlogCategoryDTO> {
  try {
    return await prisma.blogCategory.update({
      where: { id },
      data: { isPopular },
      select: blogCategorySelect,
    });
  } catch (error: unknown) {
    // P2025 record not found (e.g., invalid parentId)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Blog category not found.");
    }
    throw error;
  }
}

/** Update status */
export async function setStatusBlogCategory(
  id: string,
  status: BlogCategoryDTO["status"]
): Promise<BlogCategoryDTO> {
  return prisma.blogCategory.update({
    where: { id },
    data: { status },
    select: blogCategorySelect,
  });
}
