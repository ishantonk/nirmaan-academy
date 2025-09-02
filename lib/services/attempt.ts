import { Prisma, Attempt } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateAttemptInput,
  CreateAttemptSchema,
  UpdateAttemptInput,
  UpdateAttemptSchema,
  AttemptListQueryInput,
  AttemptListQuerySchema,
} from "../validators";

/** Common select shape */
const attemptSelect = {
  id: true,
  title: true,
  downloadPrice: true,
  downloadDiscountPrice: true,
  pendrivePrice: true,
  pendriveDiscountPrice: true,
  courseId: true,
  course: {
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.AttemptSelect;

/** DTO Type */
export type AttemptDTO = Prisma.AttemptGetPayload<{
  select: typeof attemptSelect;
}>;

/** Create Attempt */
export async function createAttempt(input: unknown): Promise<AttemptDTO> {
  const data = parseOrThrow<CreateAttemptInput>(CreateAttemptSchema, input);

  try {
    const created = await prisma.attempt.create({
      data: {
        title: data.title,
        downloadPrice: data.downloadPrice,
        downloadDiscountPrice: data.downloadDiscountPrice,
        pendrivePrice: data.pendrivePrice,
        pendriveDiscountPrice: data.pendriveDiscountPrice,
        courseId: data.courseId,
      },
      select: attemptSelect,
    });
    return created;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle unique constraint error
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      // Handle invalid course relation
      if (error.code === "P2025") {
        throw new Error("Related course not found.");
      }
    }
    throw error;
  }
}

/** Update Attempt (Partial) */
export async function updateAttempt(input: unknown): Promise<AttemptDTO> {
  const data = parseOrThrow<UpdateAttemptInput>(UpdateAttemptSchema, input);

  const { id, ...rest } = data;

  try {
    const updated = await prisma.attempt.update({
      where: { id },
      data: {
        ...(rest.title !== undefined && { title: rest.title }),
        ...(rest.downloadPrice !== undefined && {
          downloadPrice: rest.downloadPrice,
        }),
        ...(rest.downloadDiscountPrice !== undefined && {
          downloadDiscountPrice: rest.downloadDiscountPrice,
        }),
        ...(rest.pendrivePrice !== undefined && {
          pendrivePrice: rest.pendrivePrice,
        }),
        ...(rest.pendriveDiscountPrice !== undefined && {
          pendriveDiscountPrice: rest.pendriveDiscountPrice,
        }),
        ...(rest.courseId !== undefined && { courseId: rest.courseId }),
      },
      select: attemptSelect,
    });
    return updated;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle unique constraint error
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      // Handle record not found
      if (error.code === "P2025") {
        throw new Error("Attempt not found.");
      }
    }
    throw error;
  }
}

/** Delete Attempt */
export async function deleteAttempt(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.attempt.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Attempt not found.");
    }
    throw error;
  }
}

/** Get Attempt by ID */
export async function getAttemptById(id: string): Promise<AttemptDTO | null> {
  return prisma.attempt.findUnique({
    where: { id },
    select: attemptSelect,
  });
}

/** Get Attempts by Course */
export async function getAttemptsByCourse(
  courseId: string
): Promise<AttemptDTO[]> {
  return prisma.attempt.findMany({
    where: { courseId },
    select: attemptSelect,
  });
}

/** List Attempts with filters + pagination */
export async function listAttempts(input: unknown): Promise<{
  items: AttemptDTO[];
  nextCursor?: string;
  total?: number; // optional expensive count, enable when needed
}> {
  const params = parseOrThrow<AttemptListQueryInput>(
    AttemptListQuerySchema,
    input
  );

  const where: Prisma.AttemptWhereInput = {
    ...(params.courseId && { courseId: params.courseId }),
    ...(params.q && {
      title: { contains: params.q, mode: "insensitive" },
    }),
  };

  const items = await prisma.attempt.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: attemptSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}
