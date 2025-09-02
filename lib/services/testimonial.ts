import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateTestimonialInput,
  CreateTestimonialSchema,
  UpdateTestimonialInput,
  UpdateTestimonialSchema,
  TestimonialListQueryInput,
  TestimonialListQuerySchema,
} from "../validators";

/** Common select shape */
const testimonialSelect = {
  id: true,
  name: true,
  role: true,
  image: true,
  content: true,
  rating: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.TestimonialSelect;

/** DTO Type */
export type TestimonialDTO = Prisma.TestimonialGetPayload<{
  select: typeof testimonialSelect;
}>;

/** Create Testimonial */
export async function createTestimonial(
  input: unknown
): Promise<TestimonialDTO> {
  const data = parseOrThrow<CreateTestimonialInput>(
    CreateTestimonialSchema,
    input
  );

  const created = await prisma.testimonial.create({
    data: {
      name: data.name,
      role: data.role,
      image: data.image,
      content: data.content,
      rating: data.rating ?? 0,
    },
    select: testimonialSelect,
  });

  return created;
}

/** Update Testimonial */
export async function updateTestimonial(
  input: unknown
): Promise<TestimonialDTO> {
  const data = parseOrThrow<UpdateTestimonialInput>(
    UpdateTestimonialSchema,
    input
  );
  const { id, ...rest } = data;

  try {
    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(rest.name !== undefined && { name: rest.name }),
        ...(rest.role !== undefined && { role: rest.role }),
        ...(rest.image !== undefined && { image: rest.image }),
        ...(rest.content !== undefined && { content: rest.content }),
        ...(rest.rating !== undefined && { rating: rest.rating }),
      },
      select: testimonialSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Testimonial not found.");
    }
    throw error;
  }
}

/** Delete Testimonial */
export async function deleteTestimonial(id: string): Promise<{ id: string }> {
  try {
    return await prisma.testimonial.delete({
      where: { id },
      select: { id: true },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Testimonial not found.");
    }
    throw error;
  }
}

/** Get Testimonial by ID */
export async function getTestimonialById(
  id: string
): Promise<TestimonialDTO | null> {
  return prisma.testimonial.findUnique({
    where: { id },
    select: testimonialSelect,
  });
}

/** List Testimonials with Filters + Pagination */
export async function listTestimonials(input: unknown): Promise<{
  items: TestimonialDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<TestimonialListQueryInput>(
    TestimonialListQuerySchema,
    input
  );

  const where: Prisma.TestimonialWhereInput = {
    ...(params.q && {
      OR: [
        { name: { contains: params.q, mode: "insensitive" } },
        { role: { contains: params.q, mode: "insensitive" } },
        { content: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.testimonial.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: testimonialSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}
