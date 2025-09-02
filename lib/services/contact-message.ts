import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateContactMessageInput,
  CreateContactMessageSchema,
  ContactMessageListQueryInput,
  ContactMessageListQuerySchema,
} from "../validators";

/** Common select shape */
const contactMessageSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ContactMessageSelect;

/** DTO Type */
export type ContactMessageDTO = Prisma.ContactMessageGetPayload<{
  select: typeof contactMessageSelect;
}>;

/** Create ContactMessage */
export async function createContactMessage(
  input: unknown
): Promise<ContactMessageDTO> {
  const data = parseOrThrow<CreateContactMessageInput>(
    CreateContactMessageSchema,
    input
  );

  const created = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject: data.subject ?? null,
      message: data.message,
    },
    select: contactMessageSelect,
  });

  return created;
}

/** Get ContactMessage by ID */
export async function getContactMessageById(
  id: string
): Promise<ContactMessageDTO | null> {
  return prisma.contactMessage.findUnique({
    where: { id },
    select: contactMessageSelect,
  });
}

/** Delete ContactMessage */
export async function deleteContactMessage(
  id: string
): Promise<{ id: string }> {
  try {
    const deleted = await prisma.contactMessage.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Contact message not found.");
    }
    throw error;
  }
}

/** List ContactMessages (with filters + pagination) */
export async function listContactMessages(input: unknown): Promise<{
  items: ContactMessageDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<ContactMessageListQueryInput>(
    ContactMessageListQuerySchema,
    input
  );

  const where: Prisma.ContactMessageWhereInput = {
    ...(params.q && {
      OR: [
        { name: { contains: params.q, mode: "insensitive" } },
        { email: { contains: params.q, mode: "insensitive" } },
        { subject: { contains: params.q, mode: "insensitive" } },
        { message: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.contactMessage.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: contactMessageSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}
