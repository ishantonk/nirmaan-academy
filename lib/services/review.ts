import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseOrThrow } from "@/lib/services/utils";
import {
  CreateReviewInput,
  CreateReviewSchema,
  UpdateReviewInput,
  UpdateReviewSchema,
} from "../validators";

/** Select shape */
const reviewSelect = {
  id: true,
  rating: true,
  comment: true,
  userId: true,
  courseId: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
  course: {
    select: {
      id: true,
      title: true,
    },
  },
} satisfies Prisma.ReviewSelect;

export type ReviewDTO = Prisma.ReviewGetPayload<{
  select: typeof reviewSelect;
}>;

/**
 * Create a Review
 * - One review per user per course (enforced by unique constraint)
 */
export async function createReview(input: unknown): Promise<ReviewDTO> {
  const data = parseOrThrow<CreateReviewInput>(CreateReviewSchema, input);

  try {
    return await prisma.review.create({
      data,
      select: reviewSelect,
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation (user already reviewed this course)
      if (error.code === "P2002") {
        throw new Error("You have already submitted a review for this course.");
      }
      // Foreign key constraint violation
      if (error.code === "P2003") {
        throw new Error("Invalid user or course reference.");
      }
    }
    throw error;
  }
}

/**
 * Get Review by ID
 */
export async function getReviewById(id: string): Promise<ReviewDTO | null> {
  return prisma.review.findUnique({
    where: { id },
    select: reviewSelect,
  });
}

/**
 * List Reviews (with pagination + optional filters)
 */
export async function listReviews(params?: {
  skip?: number;
  take?: number;
  courseId?: string;
  userId?: string;
}): Promise<ReviewDTO[]> {
  const { skip, take, courseId, userId } = params || {};

  return prisma.review.findMany({
    where: {
      ...(courseId && { courseId }),
      ...(userId && { userId }),
    },
    orderBy: { createdAt: "desc" },
    skip,
    take,
    select: reviewSelect,
  });
}

/**
 * Update Review (only rating/comment)
 */
export async function updateReview(input: unknown): Promise<ReviewDTO> {
  const data = parseOrThrow<UpdateReviewInput>(UpdateReviewSchema, input);

  try {
    return await prisma.review.update({
      where: { id: data.id },
      data: {
        ...(data.rating !== undefined && { rating: data.rating }),
        ...(data.comment !== undefined && { comment: data.comment }),
      },
      select: reviewSelect,
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Review not found.");
    }
    throw error;
  }
}

/**
 * Delete Review
 */
export async function deleteReview(id: string): Promise<{ id: string }> {
  try {
    return await prisma.review.delete({
      where: { id },
      select: { id: true },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("Review not found.");
    }
    throw error;
  }
}

/**
 * Get Average Rating for a Course
 */
export async function getCourseAverageRating(
  courseId: string
): Promise<number> {
  const result = await prisma.review.aggregate({
    where: { courseId },
    _avg: { rating: true },
  });

  return result._avg.rating ?? 0;
}

/**
 * Get Review Count for a Course
 */
export async function getCourseReviewCount(courseId: string): Promise<number> {
  return prisma.review.count({
    where: { courseId },
  });
}
