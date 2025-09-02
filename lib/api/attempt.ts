import type { AttemptDTO } from "@/lib/services";
import type {
  CreateAttemptInput,
  UpdateAttemptInput,
  AttemptListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of attempts (Public) */
export async function getAttempts(
  params?: AttemptListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: AttemptDTO[];
  nextCursor?: string;
  total?: number; // optional expensive count, enable when needed
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: AttemptDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/attempts?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get attempt by ID (Public) */
export async function getAttemptById(
  id: string,
  signal?: AbortSignal
): Promise<AttemptDTO> {
  return apiRequest<AttemptDTO>(`/api/attempts/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get attempts by Course ID (Public) */
export async function getAttemptsByCourse(
  courseId: string,
  signal?: AbortSignal
): Promise<AttemptDTO[]> {
  return apiRequest<AttemptDTO[]>(`/api/courses/${courseId}/attempts`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create attempt (Protected) */
export async function createAttempt(
  input: CreateAttemptInput,
  signal?: AbortSignal
): Promise<AttemptDTO> {
  return apiRequest<AttemptDTO>(`/api/attempts`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update attempt (Protected) */
export async function updateAttempt(
  input: UpdateAttemptInput,
  signal?: AbortSignal
): Promise<AttemptDTO> {
  return apiRequest<AttemptDTO>(`/api/attempts/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete attempt (Protected) */
export async function deleteAttempt(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/attempts/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}
