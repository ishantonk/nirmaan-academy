import { useQuery } from "@tanstack/react-query";
import {
  getAttempts,
  getAttemptById,
  createAttempt,
  updateAttempt,
  deleteAttempt,
  getAttemptsByCourse,
} from "@/lib/api";
import type {
  CreateAttemptInput,
  UpdateAttemptInput,
  AttemptListQueryInput,
} from "@/lib/validators";
import { AttemptDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const attemptsQueryKey = ["attempts"];
export const coursesQueryKey = ["courses"];

/** Get Attempts Hook (List) */
export function useAttempts(query?: AttemptListQueryInput) {
  return useQuery<{
    items: AttemptDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [attemptsQueryKey, query],
    queryFn: ({ signal }) => getAttempts(query!, signal),
    placeholderData: (prev) => prev, // Keep previous data while fetching
    staleTime: 1000 * 60, // 1 minute
    retry: 2, // Retry twice on failure
  });
}

/** Get Single Attempt Hook */
export function useAttemptById(id: string) {
  return useQuery<AttemptDTO>({
    queryKey: [...attemptsQueryKey, id],
    queryFn: ({ signal }) => getAttemptById(id, signal),
    enabled: !!id, // Only fetch if id exists
    staleTime: 1000 * 60, // 1 minute
    retry: 2, // Retry twice on failure
  });
}

/** Get Attempts by Course ID Hook */
export function useAttemptsByCourse(courseId: string) {
  return useQuery<AttemptDTO[]>({
    queryKey: [...attemptsQueryKey, coursesQueryKey, courseId],
    queryFn: ({ signal }) => getAttemptsByCourse(courseId, signal),
    enabled: !!courseId, // only fetch when courseId exists
    staleTime: 1000 * 60, // 1 minute
    retry: 2, // Retry twice on failure
  });
}

/** Create Attempt Hook */
export function useCreateAttempt(onSuccessCallback?: () => void) {
  return useAppMutation<CreateAttemptInput>(createAttempt, {
    onSuccessMessage: "Attempt created successfully!",
    onSuccessCallback,
    invalidateKeys: attemptsQueryKey,
  });
}

/** Update Attempt Hook */
export function useUpdateAttempt(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateAttemptInput>(updateAttempt, {
    onSuccessMessage: "Attempt updated successfully!",
    onSuccessCallback,
    invalidateKeys: attemptsQueryKey,
  });
}

/** Delete Attempt Hook */
export function useDeleteAttempt(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteAttempt, {
    onSuccessMessage: "Attempt deleted successfully!",
    onSuccessCallback,
    invalidateKeys: attemptsQueryKey,
  });
}
