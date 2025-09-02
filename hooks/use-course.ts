import { useQuery } from "@tanstack/react-query";
import {
  getCourses,
  getCourseById,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleTrending,
  toggleOnSale,
  updateCourseStatus,
  updateCoursePriority,
} from "@/lib/api";
import type {
  CreateCourseInput,
  UpdateCourseInput,
  CourseListQueryInput,
} from "@/lib/validators";
import type { CourseDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const coursesQueryKey = ["courses"];

/** Get Courses Hook (List) */
export function useCourses(query?: CourseListQueryInput) {
  return useQuery<{
    items: CourseDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [coursesQueryKey, query],
    queryFn: ({ signal }) => getCourses(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Course by ID Hook */
export function useCourseById(id: string) {
  return useQuery<CourseDTO>({
    queryKey: [...coursesQueryKey, id],
    queryFn: ({ signal }) => getCourseById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Course by Slug Hook */
export function useCourseBySlug(slug: string) {
  return useQuery<CourseDTO>({
    queryKey: [...coursesQueryKey, "slug", slug],
    queryFn: ({ signal }) => getCourseBySlug(slug, signal),
    enabled: !!slug,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Course Hook */
export function useCreateCourse(onSuccessCallback?: () => void) {
  return useAppMutation<CreateCourseInput>(createCourse, {
    onSuccessMessage: "Course created successfully!",
    onSuccessCallback,
    invalidateKeys: coursesQueryKey,
  });
}

/** Update Course Hook */
export function useUpdateCourse(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateCourseInput>(updateCourse, {
    onSuccessMessage: "Course updated successfully!",
    onSuccessCallback,
    invalidateKeys: coursesQueryKey,
  });
}

/** Delete Course Hook */
export function useDeleteCourse(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteCourse, {
    onSuccessMessage: "Course deleted successfully!",
    onSuccessCallback,
    invalidateKeys: coursesQueryKey,
  });
}

/** Toggle Trending Hook */
export function useToggleTrending(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; isTrending: boolean }>(
    ({ id, isTrending }) => toggleTrending(id, isTrending),
    {
      onSuccessMessage: "Course trending status updated!",
      onSuccessCallback,
      invalidateKeys: coursesQueryKey,
    }
  );
}

/** Toggle OnSale Hook */
export function useToggleOnSale(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; onSale: boolean }>(
    ({ id, onSale }) => toggleOnSale(id, onSale),
    {
      onSuccessMessage: "Course on-sale status updated!",
      onSuccessCallback,
      invalidateKeys: coursesQueryKey,
    }
  );
}

/** Update Status Hook */
export function useUpdateCourseStatus(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; status: CourseDTO["status"] }>(
    ({ id, status }) => updateCourseStatus(id, status),
    {
      onSuccessMessage: "Course status updated successfully!",
      onSuccessCallback,
      invalidateKeys: coursesQueryKey,
    }
  );
}

/** Update Priority Hook */
export function useUpdateCoursePriority(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; priority: number }>(
    ({ id, priority }) => updateCoursePriority(id, priority),
    {
      onSuccessMessage: "Course priority updated successfully!",
      onSuccessCallback,
      invalidateKeys: coursesQueryKey,
    }
  );
}
