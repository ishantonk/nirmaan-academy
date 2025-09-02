import { BlogCategoryDTO } from "@/lib/services";
import {
  CreateBlogCategoryInput,
  UpdateBlogCategoryInput,
  BlogCategoryListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of blog categories (Public) */
export async function getBlogCategories(
  params?: BlogCategoryListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: BlogCategoryDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: BlogCategoryDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/blog-categories?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get blog category by ID (Public) */
export async function getBlogCategoryById(
  id: string,
  signal?: AbortSignal
): Promise<BlogCategoryDTO> {
  return apiRequest<BlogCategoryDTO>(`/api/blog-categories/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get blog category by slug (Public) */
export async function getBlogCategoryBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<BlogCategoryDTO> {
  const queryString = toSearchParams({ slug: slug });
  return apiRequest<BlogCategoryDTO>(`/api/blog-categories?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create blog category (Protected) */
export async function createBlogCategory(
  input: CreateBlogCategoryInput,
  signal?: AbortSignal
): Promise<BlogCategoryDTO> {
  return apiRequest<BlogCategoryDTO>(`/api/blog-categories`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update blog category (Protected) */
export async function updateBlogCategory(
  input: UpdateBlogCategoryInput,
  signal?: AbortSignal
): Promise<BlogCategoryDTO> {
  return apiRequest<BlogCategoryDTO>(`/api/blog-categories/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete blog category (Protected) */
export async function deleteBlogCategory(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/blog-categories/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Toggle Popular (Protected) */
export async function togglePopularBlogCategory(
  id: string,
  isPopular: boolean,
  signal?: AbortSignal
): Promise<BlogCategoryDTO> {
  return apiRequest<BlogCategoryDTO>(`/api/blog-categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isPopular }),
    cache: "no-store",
    signal,
  });
}

/** Update Status (Protected) */
export async function updateStatusBlogCategory(
  id: string,
  status: BlogCategoryDTO["status"],
  signal?: AbortSignal
): Promise<BlogCategoryDTO> {
  return apiRequest<BlogCategoryDTO>(`/api/blog-categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
    signal,
  });
}
