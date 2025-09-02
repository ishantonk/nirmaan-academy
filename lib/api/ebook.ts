import { EbookDTO } from "@/lib/services";
import {
  CreateEbookInput,
  UpdateEbookInput,
  EbookListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of ebooks (Public) */
export async function getEbooks(
  params?: EbookListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: EbookDTO[];
  nextCursor?: string;
  total?: number; // optional expensive count
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: EbookDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/ebooks?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get ebook by ID (Public) */
export async function getEbookById(
  id: string,
  signal?: AbortSignal
): Promise<EbookDTO> {
  return apiRequest<EbookDTO>(`/api/ebooks/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get ebook by Slug (Public) */
export async function getEbookBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<EbookDTO> {
  const queryString = toSearchParams({ slug: slug });
  return apiRequest<EbookDTO>(`/api/ebooks?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get ebooks by Category ID (Public) */
export async function getEbooksByCategory(
  categoryId: string,
  signal?: AbortSignal
): Promise<EbookDTO[]> {
  return apiRequest<EbookDTO[]>(`/api/ebook-categories/${categoryId}/ebooks`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create ebook (Protected) */
export async function createEbook(
  input: CreateEbookInput,
  signal?: AbortSignal
): Promise<EbookDTO> {
  return apiRequest<EbookDTO>(`/api/ebooks`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update ebook (Protected) */
export async function updateEbook(
  input: UpdateEbookInput,
  signal?: AbortSignal
): Promise<EbookDTO> {
  return apiRequest<EbookDTO>(`/api/ebooks/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete ebook (Protected) */
export async function deleteEbook(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/ebooks/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Update Status (Protected) */
export async function updateEbookStatus(
  id: string,
  status: EbookDTO["status"],
  signal?: AbortSignal
): Promise<EbookDTO> {
  return apiRequest<EbookDTO>(`/api/ebooks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
    signal,
  });
}
