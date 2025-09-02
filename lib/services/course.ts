import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateCourseInput,
  CreateCourseSchema,
  UpdateCourseInput,
  UpdateCourseSchema,
  CourseListQueryInput,
  CourseListQuerySchema,
} from "../validators";

/** Common select shape */
const courseSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  thumbnail: true,
  onSale: true,
  durationInMin: true,
  status: true,
  isTrending: true,
  studyMaterial: true,
  videoLanguage: true,
  courseMaterialLanguage: true,
  demoVideoUrl: true,
  priority: true,
  metaTitle: true,
  metaKeywords: true,
  metaDescription: true,
  categoryId: true,
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  attempts: {
    select: {
      id: true,
      title: true,
      downloadPrice: true,
      downloadDiscountPrice: true,
      pendrivePrice: true,
      pendriveDiscountPrice: true,
    },
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CourseSelect;

/** DTO Type */
export type CourseDTO = Prisma.CourseGetPayload<{
  select: typeof courseSelect;
}>;

/** Create Course */
export async function createCourse(input: unknown): Promise<CourseDTO> {
  const data = parseOrThrow<CreateCourseInput>(CreateCourseSchema, input);

  try {
    const created = await prisma.course.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description ?? null,
        thumbnail: data.thumbnail ?? null,
        onSale: data.onSale ?? false,
        durationInMin: data.durationInMin ?? 0,
        status: data.status ?? "DRAFT",
        isTrending: data.isTrending ?? false,
        studyMaterial: data.studyMaterial,
        videoLanguage: data.videoLanguage,
        courseMaterialLanguage: data.courseMaterialLanguage,
        demoVideoUrl: data.demoVideoUrl ?? null,
        priority: data.priority ?? 0,
        metaTitle: data.metaTitle,
        metaKeywords: data.metaKeywords,
        metaDescription: data.metaDescription,
        categoryId: data.categoryId,
      },
      select: courseSelect,
    });

    return created;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Category not found.");
      }
    }
    throw error;
  }
}

/** Update Course (Partial) */
export async function updateCourse(input: unknown): Promise<CourseDTO> {
  const data = parseOrThrow<UpdateCourseInput>(UpdateCourseSchema, input);
  const { id, ...rest } = data;

  try {
    const updated = await prisma.course.update({
      where: { id },
      data: {
        ...(rest.title !== undefined && { title: rest.title }),
        ...(rest.slug !== undefined && { slug: rest.slug }),
        ...(rest.description !== undefined && {
          description: rest.description,
        }),
        ...(rest.thumbnail !== undefined && { thumbnail: rest.thumbnail }),
        ...(rest.onSale !== undefined && { onSale: rest.onSale }),
        ...(rest.durationInMin !== undefined && {
          durationInMin: rest.durationInMin,
        }),
        ...(rest.isTrending !== undefined && { isTrending: rest.isTrending }),
        ...(rest.studyMaterial !== undefined && {
          studyMaterial: rest.studyMaterial,
        }),
        ...(rest.videoLanguage !== undefined && {
          videoLanguage: rest.videoLanguage,
        }),
        ...(rest.courseMaterialLanguage !== undefined && {
          courseMaterialLanguage: rest.courseMaterialLanguage,
        }),
        ...(rest.demoVideoUrl !== undefined && {
          demoVideoUrl: rest.demoVideoUrl,
        }),
        ...(rest.priority !== undefined && { priority: rest.priority }),
        ...(rest.metaTitle !== undefined && { metaTitle: rest.metaTitle }),
        ...(rest.metaKeywords !== undefined && {
          metaKeywords: rest.metaKeywords,
        }),
        ...(rest.metaDescription !== undefined && {
          metaDescription: rest.metaDescription,
        }),
        ...(rest.categoryId !== undefined && { categoryId: rest.categoryId }),
      },
      select: courseSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const fields = (error.meta?.target as string[]) ?? [];
        throw new Error(`Unique constraint failed on: ${fields.join(", ")}`);
      }
      if (error.code === "P2025") {
        throw new Error("Course not found.");
      }
    }
    throw error;
  }
}

/** Delete Course */
export async function deleteCourse(id: string): Promise<{ id: string }> {
  try {
    const deleted = await prisma.course.delete({
      where: { id },
      select: { id: true },
    });
    return deleted;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Course not found.");
    }
    throw error;
  }
}

/** Get Course by ID */
export async function getCourseById(id: string): Promise<CourseDTO | null> {
  return prisma.course.findUnique({
    where: { id },
    select: courseSelect,
  });
}

/** Get Course by Slug */
export async function getCourseBySlug(slug: string): Promise<CourseDTO | null> {
  return prisma.course.findUnique({
    where: { slug },
    select: courseSelect,
  });
}

/** List Courses (with filters + pagination) */
export async function listCourses(input: unknown): Promise<{
  items: CourseDTO[];
  nextCursor?: string;
}> {
  const params = parseOrThrow<CourseListQueryInput>(
    CourseListQuerySchema,
    input
  );

  const where: Prisma.CourseWhereInput = {
    ...(params.status && { status: params.status }),
    ...(params.isTrending !== undefined && { isTrending: params.isTrending }),
    ...(params.onSale !== undefined && { onSale: params.onSale }),
    ...(params.categoryId && { categoryId: params.categoryId }),
    ...(params.q && {
      OR: [
        { title: { contains: params.q, mode: "insensitive" } },
        { slug: { contains: params.q, mode: "insensitive" } },
      ],
    }),
  };

  const items = await prisma.course.findMany({
    where,
    take: params.take + 1,
    ...(params.cursor && { skip: 1, cursor: { id: params.cursor } }),
    orderBy: { [params.orderBy]: params.order },
    select: courseSelect,
  });

  let nextCursor: string | undefined = undefined;
  if (items.length > params.take) {
    const next = items.pop()!;
    nextCursor = next.id;
  }

  return { items, nextCursor };
}

/** Toggle trending flag */
export async function setTrendingCourse(
  id: string,
  isTrending: boolean
): Promise<CourseDTO> {
  try {
    return await prisma.course.update({
      where: { id },
      data: { isTrending },
      select: courseSelect,
    });
  } catch (error: unknown) {
    // P2025 record not found (e.g., invalid parentId)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Course not found.");
    }
    throw error;
  }
}

/** Toggle on-sale flag */
export async function setOnSaleCourse(
  id: string,
  onSale: boolean
): Promise<CourseDTO> {
  try {
    return await prisma.course.update({
      where: { id },
      data: { onSale },
      select: courseSelect,
    });
  } catch (error: unknown) {
    // P2025 record not found (e.g., invalid parentId)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Course not found.");
    }
    throw error;
  }
}

/** Update Course Priority */
export async function setPriorityCourse(
  id: string,
  priority: number
): Promise<CourseDTO> {
  try {
    const updated = await prisma.course.update({
      where: { id },
      data: {
        priority,
      },
      select: courseSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Course not found.");
    }
    throw error;
  }
}

/** Update Status (Controlled Action) */
export async function setStatusCourse(
  id: string,
  newStatus: CourseDTO["status"]
): Promise<CourseDTO> {
  try {
    const updated = await prisma.course.update({
      where: { id },
      data: {
        status: newStatus,
      },
      select: courseSelect,
    });

    return updated;
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Course not found.");
    }
    throw error;
  }
}
