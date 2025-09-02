import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateNoticeInput,
  CreateNoticeSchema,
  UpdateNoticeInput,
  UpdateNoticeSchema,
  NoticeListQueryInput,
  NoticeListQuerySchema,
} from "../validators";

/** Common select shape */
const noticeSelect = {
  id: true,
  content: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.NoticeSelect;

/** DTO Type */
export type NoticeDTO = Prisma.NoticeGetPayload<{
  select: typeof noticeSelect;
}>;

/** Create Notice */
export async function createNotice(input: unknown): Promise<NoticeDTO> {
  const data = parseOrThrow<CreateNoticeInput>(CreateNoticeSchema, input);

  const created = await prisma.notice.create({
    data: {
      content: data.content,
      status: data.status ?? "ACTIVE",
    },
    select: noticeSelect,
  });

  return created;
}

/** Update Notice (Partial) */
export async function updateNotice(input: unknown): Promise<NoticeDTO> {
  const data = parseOrThrow<UpdateNoticeInput>(UpdateNoticeSchema, input);
  const { id, ...rest } = data;

  try {
    const updated = await prisma.notice.update({
      where: { id },
      data: {
        ...(rest.content !== undefined && { content: rest.content }),
        ...(rest.status !== undefined && { status: rest.status }),
      },
      select: noticeSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Notice not found.");
    }
    throw error;
  }
}

/** Delete Notice */
export async function deleteNotice(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.notice.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Notice not found.");
    }
    throw error;
  }
}

/** Get Notice by ID */
export async function getNoticeById(id: string): Promise<NoticeDTO | null> {
  return prisma.notice.findUnique({
    where: { id },
    select: noticeSelect,
  });
}

/** List Notices (with filters + pagination) */
export async function listNotices(input: unknown): Promise<{
  items: NoticeDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<NoticeListQueryInput>(
    NoticeListQuerySchema,
    input
  );

  const where: Prisma.NoticeWhereInput = {
    ...(params.status && { status: params.status }),
    ...(params.q && {
      content: { contains: params.q, mode: "insensitive" },
    }),
  };

  const items = await prisma.notice.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: noticeSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Update Notice Status */
export async function updateStatusNotice(
  id: string,
  status: NoticeDTO["status"]
): Promise<NoticeDTO> {
  try {
    const updated = await prisma.notice.update({
      where: { id },
      data: { status },
      select: noticeSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Notice not found.");
    }
    throw error;
  }
}
