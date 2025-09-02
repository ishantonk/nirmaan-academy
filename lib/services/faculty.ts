import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateFacultyInput,
  CreateFacultySchema,
  UpdateFacultyInput,
  UpdateFacultySchema,
  FacultyListQueryInput,
  FacultyListQuerySchema,
} from "../validators";

/** Common select shape */
const facultySelect = {
  id: true,
  name: true,
  bio: true,
  image: true,
  designation: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.FacultySelect;

/** DTO Type */
export type FacultyDTO = Prisma.FacultyGetPayload<{
  select: typeof facultySelect;
}>;

/** Create Faculty */
export async function createFaculty(input: unknown): Promise<FacultyDTO> {
  const data = parseOrThrow<CreateFacultyInput>(CreateFacultySchema, input);

  try {
    const created = await prisma.faculty.create({
      data: {
        name: data.name,
        bio: data.bio ?? null,
        image: data.image ?? null,
        designation: data.designation ?? null,
      },
      select: facultySelect,
    });

    return created;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const fields = (error.meta?.target as string[]) ?? [];
      throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
    }
    throw error;
  }
}

/** Update Faculty */
export async function updateFaculty(input: unknown): Promise<FacultyDTO> {
  const data = parseOrThrow<UpdateFacultyInput>(UpdateFacultySchema, input);
  const { id, ...rest } = data;

  try {
    const updated = await prisma.faculty.update({
      where: { id },
      data: {
        ...(rest.name !== undefined && { name: rest.name }),
        ...(rest.bio !== undefined && { bio: rest.bio }),
        ...(rest.image !== undefined && { image: rest.image }),
        ...(rest.designation !== undefined && {
          designation: rest.designation,
        }),
      },
      select: facultySelect,
    });

    return updated;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Faculty not found.");
      }
    }
    throw error;
  }
}

/** Delete Faculty */
export async function deleteFaculty(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.faculty.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Faculty not found.");
    }
    throw error;
  }
}

/** Get Faculty by ID */
export async function getFacultyById(id: string): Promise<FacultyDTO | null> {
  return prisma.faculty.findUnique({
    where: { id },
    select: facultySelect,
  });
}

/** List Faculties with filters + pagination */
export async function listFaculties(input: unknown): Promise<{
  items: FacultyDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<FacultyListQueryInput>(
    FacultyListQuerySchema,
    input
  );

  const where: Prisma.FacultyWhereInput = {
    ...(params.q && {
      OR: [
        { name: { contains: params.q, mode: "insensitive" } },
        { designation: { contains: params.q, mode: "insensitive" } },
        { bio: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.faculty.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: facultySelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}
