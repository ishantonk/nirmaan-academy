import type { FaqDTO } from "@/lib/services";
import type {
  CreateFaqInput,
  UpdateFaqInput,
  FaqListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of FAQs (Public) */
export async function getFaqs(
  params?: FaqListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: FaqDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: FaqDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/faqs?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get FAQ by ID (Public) */
export async function getFaqById(
  id: string,
  signal?: AbortSignal
): Promise<FaqDTO> {
  return apiRequest<FaqDTO>(`/api/faqs/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create FAQ (Protected) */
export async function createFaq(
  input: CreateFaqInput,
  signal?: AbortSignal
): Promise<FaqDTO> {
  return apiRequest<FaqDTO>(`/api/faqs`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update FAQ (Protected) */
export async function updateFaq(
  input: UpdateFaqInput,
  signal?: AbortSignal
): Promise<FaqDTO> {
  return apiRequest<FaqDTO>(`/api/faqs/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete FAQ (Protected) */
export async function deleteFaq(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/faqs/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Update FAQ Preference (Protected) */
export async function updateFaqPreference(
  id: string,
  preference: number,
  signal?: AbortSignal
): Promise<FaqDTO> {
  return apiRequest<FaqDTO>(`/api/faqs/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ preference }),
    cache: "no-store",
    signal,
  });
}

/** Update FAQ Status (Protected) */
export async function updateFaqStatus(
  id: string,
  status: FaqDTO["status"],
  signal?: AbortSignal
): Promise<FaqDTO> {
  return apiRequest<FaqDTO>(`/api/faqs/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
    signal,
  });
}
