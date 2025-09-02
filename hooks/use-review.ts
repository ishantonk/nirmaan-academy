import { useQuery } from "@tanstack/react-query";
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "@/lib/api";
import type {
  CreateReviewInput,
  UpdateReviewInput,
  ReviewListQueryInput,
} from "@/lib/validators";
import type { ReviewDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const reviewsQueryKey = ["reviews"];

/** Get Reviews (List) Hook */
export function useReviews(query?: ReviewListQueryInput) {
  return useQuery<{
    items: ReviewDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [reviewsQueryKey, query],
    queryFn: ({ signal }) => getReviews(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Review by ID Hook */
export function useReviewById(id: string) {
  return useQuery<ReviewDTO>({
    queryKey: [...reviewsQueryKey, id],
    queryFn: ({ signal }) => getReviewById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Review Hook */
export function useCreateReview(onSuccessCallback?: () => void) {
  return useAppMutation<CreateReviewInput>(createReview, {
    onSuccessMessage: "Review created successfully!",
    onSuccessCallback,
    invalidateKeys: reviewsQueryKey,
  });
}

/** Update Review Hook */
export function useUpdateReview(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateReviewInput>(updateReview, {
    onSuccessMessage: "Review updated successfully!",
    onSuccessCallback,
    invalidateKeys: reviewsQueryKey,
  });
}

/** Delete Review Hook */
export function useDeleteReview(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteReview, {
    onSuccessMessage: "Review deleted successfully!",
    onSuccessCallback,
    invalidateKeys: reviewsQueryKey,
  });
}
