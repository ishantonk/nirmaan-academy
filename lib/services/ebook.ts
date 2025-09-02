import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateEbookInput,
  CreateEbookSchema,
  UpdateEbookInput,
  UpdateEbookSchema,
  EbookListQueryInput,
  EbookListQuerySchema,
} from "../validators";

/** Common select shape */
const ebookSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  thumbnail: true,
  pdfFile: true,
  status: true,
  metaTitle: true,
  metaKeywords: true,
  metaDescription: true,
  categoryId: true,
  professorId: true,
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  professor: {
    select: {
      id: true,
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.EbookSelect;

/** DTO Type */
export type EbookDTO = Prisma.EbookGetPayload<{
  select: typeof ebookSelect;
}>;

/** Create Ebook */
export async function createEbook(input: unknown): Promise<EbookDTO> {
  const data = parseOrThrow<CreateEbookInput>(CreateEbookSchema, input);

  try {
    const created = await prisma.ebook.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description ?? null,
        thumbnail: data.thumbnail ?? null,
        pdfFile: data.pdfFile,
        status: data.status ?? "ACTIVE",
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
        categoryId: data.categoryId,
        professorId: data.professorId,
      },
      select: ebookSelect,
    });

    return created;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Referenced category or professor not found.");
      }
    }
    throw error;
  }
}

/** Update Ebook (Partial) */
export async function updateEbook(input: unknown): Promise<EbookDTO> {
  const data = parseOrThrow<UpdateEbookInput>(UpdateEbookSchema, input);

  const { id, ...rest } = data;

  try {
    const updated = await prisma.ebook.update({
      where: { id },
      data: {
        ...(rest.name !== undefined && { name: rest.name }),
        ...(rest.slug !== undefined && { name: rest.slug }),
        ...(rest.description !== undefined && {
          description: rest.description,
        }),
        ...(rest.thumbnail !== undefined && { thumbnail: rest.thumbnail }),
        ...(rest.pdfFile !== undefined && { pdfFile: rest.pdfFile }),
        ...(rest.metaTitle !== undefined && { metaTitle: rest.metaTitle }),
        ...(rest.metaKeywords !== undefined && {
          metaKeywords: rest.metaKeywords,
        }),
        ...(rest.metaDescription !== undefined && {
          metaDescription: rest.metaDescription,
        }),
        ...(rest.categoryId !== undefined && { categoryId: rest.categoryId }),
        ...(rest.professorId !== undefined && {
          professorId: rest.professorId,
        }),
      },
      select: ebookSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Ebook not found.");
      }
    }
    throw error;
  }
}

/** Delete Ebook */
export async function deleteEbook(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.ebook.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Ebook not found.");
    }
    throw error;
  }
}

/** Get Ebook by ID */
export async function getEbookById(id: string): Promise<EbookDTO | null> {
  return prisma.ebook.findUnique({
    where: { id },
    select: ebookSelect,
  });
}

/** Get Ebook by Slug */
export async function getEbookBySlug(slug: string): Promise<EbookDTO | null> {
  return prisma.ebook.findUnique({
    where: { slug },
    select: ebookSelect,
  });
}

/** List Ebooks (filters + pagination) */
export async function listEbooks(input: unknown): Promise<{
  items: EbookDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<EbookListQueryInput>(EbookListQuerySchema, input);

  const where: Prisma.EbookWhereInput = {
    ...(params.status && { status: params.status }),
    ...(params.categoryId && { categoryId: params.categoryId }),
    ...(params.professorId && { professorId: params.professorId }),
    ...(params.q && {
      OR: [
        { name: { contains: params.q, mode: "insensitive" } },
        { slug: { contains: params.q, mode: "insensitive" } },
        { description: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.ebook.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: ebookSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Update status */
export async function setStatusEbook(
  id: string,
  status: EbookDTO["status"]
): Promise<EbookDTO> {
  return prisma.ebook.update({
    where: { id },
    data: { status },
    select: ebookSelect,
  });
}
