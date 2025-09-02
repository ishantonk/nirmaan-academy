import { TestimonialDTO } from "@/lib/services";
import {
  CreateTestimonialInput,
  UpdateTestimonialInput,
  TestimonialListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of testimonials (Public) */
export async function getTestimonials(
  params?: TestimonialListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: TestimonialDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: TestimonialDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/testimonials?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get testimonial by ID (Public) */
export async function getTestimonialById(
  id: string,
  signal?: AbortSignal
): Promise<TestimonialDTO> {
  return apiRequest<TestimonialDTO>(`/api/testimonials/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create testimonial (Protected) */
export async function createTestimonial(
  input: CreateTestimonialInput,
  signal?: AbortSignal
): Promise<TestimonialDTO> {
  return apiRequest<TestimonialDTO>(`/api/testimonials`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update testimonial (Protected) */
export async function updateTestimonial(
  input: UpdateTestimonialInput,
  signal?: AbortSignal
): Promise<TestimonialDTO> {
  return apiRequest<TestimonialDTO>(`/api/testimonials/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete testimonial (Protected) */
export async function deleteTestimonial(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/testimonials/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}
