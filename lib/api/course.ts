import { CourseDTO } from "@/lib/services";
import {
  CreateCourseInput,
  UpdateCourseInput,
  CourseListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of courses (Public) */
export async function getCourses(
  params?: CourseListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: CourseDTO[];
  nextCursor?: string;
  total?: number; // optional expensive count, enable when needed
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: CourseDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/courses?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get course by ID (Public) */
export async function getCourseById(
  id: string,
  signal?: AbortSignal
): Promise<CourseDTO> {
  return apiRequest<CourseDTO>(`/api/courses/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get course by slug (Public) */
export async function getCourseBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<CourseDTO> {
  const queryString = toSearchParams({ slug: slug });
  return apiRequest<CourseDTO>(`/api/courses?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create course (Protected) */
export async function createCourse(
  input: CreateCourseInput,
  signal?: AbortSignal
): Promise<CourseDTO> {
  return apiRequest<CourseDTO>(`/api/courses`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update course (Protected) */
export async function updateCourse(
  input: UpdateCourseInput,
  signal?: AbortSignal
): Promise<CourseDTO> {
  return apiRequest<CourseDTO>(`/api/courses/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete course (Protected) */
export async function deleteCourse(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/courses/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Toggle Trending (Protected) */
export async function toggleTrending(
  id: string,
  isTrending: boolean,
  signal?: AbortSignal
): Promise<CourseDTO> {
  return apiRequest<CourseDTO>(`/api/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isTrending }),
    cache: "no-store",
    signal,
  });
}

/** Toggle OnSale (Protected) */
export async function toggleOnSale(
  id: string,
  onSale: boolean,
  signal?: AbortSignal
): Promise<CourseDTO> {
  return apiRequest<CourseDTO>(`/api/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ onSale }),
    cache: "no-store",
    signal,
  });
}

/** Update Status (Protected) */
export async function updateCourseStatus(
  id: string,
  status: CourseDTO["status"],
  signal?: AbortSignal
): Promise<CourseDTO> {
  return apiRequest<CourseDTO>(`/api/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
    signal,
  });
}

/** Update Course Priority (Protected) */
export async function updateCoursePriority(
  id: string,
  priority: number,
  signal?: AbortSignal
): Promise<CourseDTO> {
  return apiRequest<CourseDTO>(`/api/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ priority }),
    cache: "no-store",
    signal,
  });
}
