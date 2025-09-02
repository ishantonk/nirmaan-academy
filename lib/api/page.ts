import { PageDTO } from "@/lib/services";
import {
  CreatePageInput,
  UpdatePageInput,
  PageListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of pages (Public) */
export async function getPages(
  params?: PageListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: PageDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: PageDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/pages?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get page by ID (Public) */
export async function getPageById(
  id: string,
  signal?: AbortSignal
): Promise<PageDTO> {
  return apiRequest<PageDTO>(`/api/pages/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get page by Slug (Public) */
export async function getPageBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<PageDTO> {
  const queryString = toSearchParams({ slug: slug });
  return apiRequest<PageDTO>(`/api/pages/${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create page (Protected) */
export async function createPage(
  input: CreatePageInput,
  signal?: AbortSignal
): Promise<PageDTO> {
  return apiRequest<PageDTO>(`/api/pages`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update page (Protected) */
export async function updatePage(
  input: UpdatePageInput,
  signal?: AbortSignal
): Promise<PageDTO> {
  return apiRequest<PageDTO>(`/api/pages/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete page (Protected) */
export async function deletePage(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/pages/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Update page status (Protected) */
export async function updatePageStatus(
  id: string,
  status: PageDTO["status"],
  signal?: AbortSignal
): Promise<PageDTO> {
  return apiRequest<PageDTO>(`/api/pages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
    signal,
  });
}
