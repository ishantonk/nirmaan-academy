import { CategoryDTO } from "@/lib/services";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  CategoryListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of categories (Public) */
export async function getCategories(
  params?: CategoryListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: CategoryDTO[];
  nextCursor?: string;
  total?: number; // optional expensive count, enable when needed
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: CategoryDTO[];
    nextCursor?: string;
    total?: number; // optional expensive count, enable when needed
  }>(`/api/categories?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get category by ID (Public) */
export async function getCategoryById(
  id: string,
  signal?: AbortSignal
): Promise<CategoryDTO> {
  return apiRequest<CategoryDTO>(`/api/categories/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get category by slug (Public) */
export async function getCategoryBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<CategoryDTO> {
  const queryString = toSearchParams({ slug: slug });
  return apiRequest<CategoryDTO>(`/api/categories?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create category (Protected) */
export async function createCategory(
  input: CreateCategoryInput,
  signal?: AbortSignal
): Promise<CategoryDTO> {
  return apiRequest<CategoryDTO>(`/api/categories`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update category (Protected) */
export async function updateCategory(
  input: UpdateCategoryInput,
  signal?: AbortSignal
): Promise<CategoryDTO> {
  return apiRequest<CategoryDTO>(`/api/categories/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete category (Protected) */
export async function deleteCategory(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/categories/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Toggle Popular (Protected) */
export async function togglePopularCategory(
  id: string,
  isPopular: boolean,
  signal?: AbortSignal
): Promise<CategoryDTO> {
  return apiRequest<CategoryDTO>(`/api/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isPopular }),
    cache: "no-store",
    signal,
  });
}

/** Update Status (Protected) */
export async function updateStatusCategory(
  id: string,
  status: CategoryDTO["status"],
  signal?: AbortSignal
): Promise<CategoryDTO> {
  return apiRequest<CategoryDTO>(`/api/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
    signal,
  });
}
