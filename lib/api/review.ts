import { ReviewDTO } from "@/lib/services";
import {
  CreateReviewInput,
  UpdateReviewInput,
  ReviewListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of reviews (Public) */
export async function getReviews(
  params?: ReviewListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: ReviewDTO[];
  nextCursor?: string;
  total?: number; // optional count if needed
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: ReviewDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/reviews?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get review by ID (Public) */
export async function getReviewById(
  id: string,
  signal?: AbortSignal
): Promise<ReviewDTO> {
  return apiRequest<ReviewDTO>(`/api/reviews/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create review (Protected) */
export async function createReview(
  input: CreateReviewInput,
  signal?: AbortSignal
): Promise<ReviewDTO> {
  return apiRequest<ReviewDTO>(`/api/reviews`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update review (Protected) */
export async function updateReview(
  input: UpdateReviewInput,
  signal?: AbortSignal
): Promise<ReviewDTO> {
  return apiRequest<ReviewDTO>(`/api/reviews/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete review (Protected) */
export async function deleteReview(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/reviews/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}
