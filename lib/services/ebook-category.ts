import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateEbookCategoryInput,
  CreateEbookCategorySchema,
  UpdateEbookCategoryInput,
  UpdateEbookCategorySchema,
  EbookCategoryListQueryInput,
  EbookCategoryListQuerySchema,
} from "../validators";

/** Common select shape */
const ebookCategorySelect = {
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
} satisfies Prisma.EbookCategorySelect;

/** DTO Type */
export type EbookCategoryDTO = Prisma.EbookCategoryGetPayload<{
  select: typeof ebookCategorySelect;
}>;

/** Create Ebook Category */
export async function createEbookCategory(
  input: unknown
): Promise<EbookCategoryDTO> {
  const data = parseOrThrow<CreateEbookCategoryInput>(
    CreateEbookCategorySchema,
    input
  );

  try {
    const created = await prisma.ebookCategory.create({
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
      select: ebookCategorySelect,
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

/** Update Ebook Category (Partial) */
export async function updateEbookCategory(
  input: unknown
): Promise<EbookCategoryDTO> {
  const data = parseOrThrow<UpdateEbookCategoryInput>(
    UpdateEbookCategorySchema,
    input
  );

  const { id, ...rest } = data;

  try {
    const updated = await prisma.ebookCategory.update({
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
      select: ebookCategorySelect,
    });

    return updated;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Ebook Category not found.");
      }
    }
    throw error;
  }
}

/** Delete Ebook Category */
export async function deleteEbookCategory(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.ebookCategory.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Ebook Category not found.");
    }
    throw error;
  }
}

/** Get Ebook Category by ID */
export async function getEbookCategoryById(
  id: string
): Promise<EbookCategoryDTO | null> {
  return prisma.ebookCategory.findUnique({
    where: { id },
    select: ebookCategorySelect,
  });
}

/** Get Ebook Category by slug */
export async function getEbookCategoryBySlug(
  slug: string
): Promise<EbookCategoryDTO | null> {
  return prisma.ebookCategory.findUnique({
    where: { slug },
    select: ebookCategorySelect,
  });
}

/** List Ebook Categories (with filters + pagination) */
export async function listEbookCategories(input: unknown): Promise<{
  items: EbookCategoryDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<EbookCategoryListQueryInput>(
    EbookCategoryListQuerySchema,
    input
  );

  const where: Prisma.EbookCategoryWhereInput = {
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

  const items = await prisma.ebookCategory.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: ebookCategorySelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Toggle popular flag */
export async function setPopularEbookCategory(
  id: string,
  isPopular: boolean
): Promise<EbookCategoryDTO> {
  try {
    return await prisma.ebookCategory.update({
      where: { id },
      data: { isPopular },
      select: ebookCategorySelect,
    });
  } catch (error: unknown) {
    // P2025 record not found (e.g., invalid parentId)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Ebook category not found.");
    }
    throw error;
  }
}

/** Update status */
export async function setStatusEbookCategory(
  id: string,
  status: EbookCategoryDTO["status"]
): Promise<EbookCategoryDTO> {
  return prisma.ebookCategory.update({
    where: { id },
    data: { status },
    select: ebookCategorySelect,
  });
}
