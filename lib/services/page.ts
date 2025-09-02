import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreatePageInput,
  CreatePageSchema,
  UpdatePageInput,
  UpdatePageSchema,
  PageListQueryInput,
  PageListQuerySchema,
} from "../validators";

/** Common select shape */
const pageSelect = {
  id: true,
  title: true,
  slug: true,
  banner: true,
  content: true,
  status: true,
  metaTitle: true,
  metaKeywords: true,
  metaDescription: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PageSelect;

/** DTO Type */
export type PageDTO = Prisma.PageGetPayload<{ select: typeof pageSelect }>;

/** Create Page */
export async function createPage(input: unknown): Promise<PageDTO> {
  const data = parseOrThrow<CreatePageInput>(CreatePageSchema, input);

  const created = await prisma.page.create({
    data: {
      title: data.title,
      slug: data.slug,
      banner: data.banner ?? null,
      content: data.content,
      status: data.status ?? "ACTIVE",
      metaTitle: data.metaTitle ?? null,
      metaKeywords: data.metaKeywords ?? null,
      metaDescription: data.metaDescription ?? null,
    },
    select: pageSelect,
  });

  return created;
}

/** Update Page */
export async function updatePage(input: unknown): Promise<PageDTO> {
  const data = parseOrThrow<UpdatePageInput>(UpdatePageSchema, input);
  const { id, ...rest } = data;

  try {
    const updated = await prisma.page.update({
      where: { id },
      data: {
        ...(rest.title !== undefined && { title: rest.title }),
        ...(rest.slug !== undefined && { title: rest.slug }),
        ...(rest.banner !== undefined && { banner: rest.banner }),
        ...(rest.content !== undefined && { content: rest.content }),
        ...(rest.status !== undefined && { status: rest.status }),
        ...(rest.metaTitle !== undefined && { metaTitle: rest.metaTitle }),
        ...(rest.metaKeywords !== undefined && {
          metaKeywords: rest.metaKeywords,
        }),
        ...(rest.metaDescription !== undefined && {
          metaDescription: rest.metaDescription,
        }),
      },
      select: pageSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Page not found.");
    }
    throw error;
  }
}

/** Delete Page */
export async function deletePage(id: string): Promise<{ id: string }> {
  try {
    return await prisma.page.delete({
      where: { id },
      select: { id: true },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Page not found.");
    }
    throw error;
  }
}

/** Get Page by ID */
export async function getPageById(id: string): Promise<PageDTO | null> {
  return prisma.page.findUnique({
    where: { id },
    select: pageSelect,
  });
}

/** Get Page by Slug */
export async function getPageBySlug(slug: string): Promise<PageDTO | null> {
  return prisma.page.findUnique({
    where: { slug },
    select: pageSelect,
  });
}

/** List Pages with Filters + Pagination */
export async function listPages(input: unknown): Promise<{
  items: PageDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<PageListQueryInput>(PageListQuerySchema, input);

  const where: Prisma.PageWhereInput = {
    ...(params.status && { status: params.status }),
    ...(params.q && {
      OR: [
        { title: { contains: params.q, mode: "insensitive" } },
        { slug: { contains: params.q, mode: "insensitive" } },
        { content: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.page.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: pageSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Update Page Status */
export async function updatePageStatus(
  id: string,
  status: PageDTO["status"]
): Promise<PageDTO> {
  try {
    return await prisma.page.update({
      where: { id },
      data: { status },
      select: pageSelect,
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Page not found.");
    }
    throw error;
  }
}
