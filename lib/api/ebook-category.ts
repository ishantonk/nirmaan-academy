import { EbookCategoryDTO } from "@/lib/services";
import {
  CreateEbookCategoryInput,
  UpdateEbookCategoryInput,
  EbookCategoryListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of ebook categories (Public) */
export async function getEbookCategories(
  params?: EbookCategoryListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: EbookCategoryDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: EbookCategoryDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/ebook-categories?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get ebook category by ID (Public) */
export async function getEbookCategoryById(
  id: string,
  signal?: AbortSignal
): Promise<EbookCategoryDTO> {
  return apiRequest<EbookCategoryDTO>(`/api/ebook-categories/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get ebook category by slug (Public) */
export async function getEbookCategoryBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<EbookCategoryDTO> {
  const queryString = toSearchParams({ slug: slug });
  return apiRequest<EbookCategoryDTO>(`/api/ebook-categories?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create ebook category (Protected) */
export async function createEbookCategory(
  input: CreateEbookCategoryInput,
  signal?: AbortSignal
): Promise<EbookCategoryDTO> {
  return apiRequest<EbookCategoryDTO>(`/api/ebook-categories`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update ebook category (Protected) */
export async function updateEbookCategory(
  input: UpdateEbookCategoryInput,
  signal?: AbortSignal
): Promise<EbookCategoryDTO> {
  return apiRequest<EbookCategoryDTO>(`/api/ebook-categories/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete ebook category (Protected) */
export async function deleteEbookCategory(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/ebook-categories/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Toggle Popular (Protected) */
export async function togglePopularEbookCategory(
  id: string,
  isPopular: boolean,
  signal?: AbortSignal
): Promise<EbookCategoryDTO> {
  return apiRequest<EbookCategoryDTO>(`/api/ebook-categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isPopular }),
    cache: "no-store",
    signal,
  });
}

/** Update Status (Protected) */
export async function updateStatusEbookCategory(
  id: string,
  status: EbookCategoryDTO["status"],
  signal?: AbortSignal
): Promise<EbookCategoryDTO> {
  return apiRequest<EbookCategoryDTO>(`/api/ebook-categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
    signal,
  });
}
