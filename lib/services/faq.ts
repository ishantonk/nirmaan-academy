import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateFaqInput,
  CreateFaqSchema,
  UpdateFaqInput,
  UpdateFaqSchema,
  FaqListQueryInput,
  FaqListQuerySchema,
} from "../validators";

/** Common select shape */
const faqSelect = {
  id: true,
  question: true,
  answer: true,
  preference: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.FaqSelect;

/** DTO Type */
export type FaqDTO = Prisma.FaqGetPayload<{
  select: typeof faqSelect;
}>;

/** Create FAQ */
export async function createFaq(input: unknown): Promise<FaqDTO> {
  const data = parseOrThrow<CreateFaqInput>(CreateFaqSchema, input);

  const created = await prisma.faq.create({
    data: {
      question: data.question,
      answer: data.answer,
      preference: data.preference ?? 0,
      status: data.status ?? "ACTIVE",
    },
    select: faqSelect,
  });

  return created;
}

/** Update FAQ (Partial) */
export async function updateFaq(input: unknown): Promise<FaqDTO> {
  const data = parseOrThrow<UpdateFaqInput>(UpdateFaqSchema, input);
  const { id, ...rest } = data;

  try {
    const updated = await prisma.faq.update({
      where: { id },
      data: {
        ...(rest.question !== undefined && { question: rest.question }),
        ...(rest.answer !== undefined && { answer: rest.answer }),
        ...(rest.preference !== undefined && { preference: rest.preference }),
        ...(rest.status !== undefined && { status: rest.status }),
      },
      select: faqSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("FAQ not found.");
    }
    throw error;
  }
}

/** Delete FAQ */
export async function deleteFaq(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.faq.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("FAQ not found.");
    }
    throw error;
  }
}

/** Get FAQ by ID */
export async function getFaqById(id: string): Promise<FaqDTO | null> {
  return prisma.faq.findUnique({
    where: { id },
    select: faqSelect,
  });
}

/** List FAQs (with filters + pagination) */
export async function listFaqs(input: unknown): Promise<{
  items: FaqDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<FaqListQueryInput>(FaqListQuerySchema, input);

  const where: Prisma.FaqWhereInput = {
    ...(params.status && { status: params.status }),
    ...(params.q && {
      OR: [
        { question: { contains: params.q, mode: "insensitive" } },
        { answer: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.faq.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: faqSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Update FAQ status */
export async function updateStatusFaq(
  id: string,
  status: FaqDTO["status"]
): Promise<FaqDTO> {
  try {
    const updated = await prisma.faq.update({
      where: { id },
      data: { status },
      select: faqSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("FAQ not found.");
    }
    throw error;
  }
}

/** Update FAQ preference only */
export async function updatePreferenceFaq(
  id: string,
  preference: number
): Promise<FaqDTO> {
  try {
    const updated = await prisma.faq.update({
      where: { id },
      data: { preference },
      select: faqSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("FAQ not found.");
    }
    throw error;
  }
}
