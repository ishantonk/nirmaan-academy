import { useQuery } from "@tanstack/react-query";
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/api";
import type {
  CreateTestimonialInput,
  UpdateTestimonialInput,
  TestimonialListQueryInput,
} from "@/lib/validators";
import type { TestimonialDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const testimonialsQueryKey = ["testimonials"];

/** Get Testimonials (List) Hook */
export function useTestimonials(query?: TestimonialListQueryInput) {
  return useQuery<{
    items: TestimonialDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [testimonialsQueryKey, query],
    queryFn: ({ signal }) => getTestimonials(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Testimonial by ID Hook */
export function useTestimonialById(id: string) {
  return useQuery<TestimonialDTO>({
    queryKey: [...testimonialsQueryKey, id],
    queryFn: ({ signal }) => getTestimonialById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Testimonial Hook */
export function useCreateTestimonial(onSuccessCallback?: () => void) {
  return useAppMutation<CreateTestimonialInput>(createTestimonial, {
    onSuccessMessage: "Testimonial created successfully!",
    onSuccessCallback,
    invalidateKeys: testimonialsQueryKey,
  });
}

/** Update Testimonial Hook */
export function useUpdateTestimonial(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateTestimonialInput>(updateTestimonial, {
    onSuccessMessage: "Testimonial updated successfully!",
    onSuccessCallback,
    invalidateKeys: testimonialsQueryKey,
  });
}

/** Delete Testimonial Hook */
export function useDeleteTestimonial(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteTestimonial, {
    onSuccessMessage: "Testimonial deleted successfully!",
    onSuccessCallback,
    invalidateKeys: testimonialsQueryKey,
  });
}
