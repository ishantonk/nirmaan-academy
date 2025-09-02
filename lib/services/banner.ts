import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateBannerInput,
  CreateBannerSchema,
  UpdateBannerInput,
  UpdateBannerSchema,
  BannerListQueryInput,
  BannerListQuerySchema,
} from "../validators";

/** Common select shape */
const bannerSelect = {
  id: true,
  type: true,
  fileUrl: true,
  altText: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.BannerSelect;

/** DTO Type */
export type BannerDTO = Prisma.BannerGetPayload<{
  select: typeof bannerSelect;
}>;

/** Create Banner */
export async function createBanner(input: unknown): Promise<BannerDTO> {
  const data = parseOrThrow<CreateBannerInput>(CreateBannerSchema, input);

  try {
    const created = await prisma.banner.create({
      data: {
        type: data.type,
        fileUrl: data.fileUrl,
        altText: data.altText,
      },
      select: bannerSelect,
    });
    return created;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
    }
    throw error;
  }
}

/** Update Banner */
export async function updateBanner(input: unknown): Promise<BannerDTO> {
  const data = parseOrThrow<UpdateBannerInput>(UpdateBannerSchema, input);
  const { id, ...rest } = data;

  try {
    const updated = await prisma.banner.update({
      where: { id },
      data: {
        ...(rest.type !== undefined && { type: rest.type }),
        ...(rest.fileUrl !== undefined && { fileUrl: rest.fileUrl }),
        ...(rest.altText !== undefined && { altText: rest.altText }),
      },
      select: bannerSelect,
    });
    return updated;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Banner not found.");
      }
    }
    throw error;
  }
}

/** Delete Banner */
export async function deleteBanner(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.banner.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Banner not found.");
    }
    throw error;
  }
}

/** Get Banner by ID */
export async function getBannerById(id: string): Promise<BannerDTO | null> {
  return prisma.banner.findUnique({
    where: { id },
    select: bannerSelect,
  });
}

/** List Banners with filters + pagination */
export async function listBanners(input: unknown): Promise<{
  items: BannerDTO[];
  nextCursor?: string;
  total?: number; // optional
}> {
  const params = parseOrThrow<BannerListQueryInput>(
    BannerListQuerySchema,
    input
  );

  const where: Prisma.BannerWhereInput = {
    ...(params.type && { type: params.type }),
    ...(params.q && {
      OR: [
        { altText: { contains: params.q, mode: "insensitive" } },
        { fileUrl: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.banner.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: bannerSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}
