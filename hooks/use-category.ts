import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  togglePopularCategory,
  updateStatusCategory,
} from "@/lib/api";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
  CategoryListQueryInput,
} from "@/lib/validators";
import type { CategoryDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const categoriesQueryKey = ["categories"];

/** Get Categories Hook (List) */
export function useCategories(query?: CategoryListQueryInput) {
  return useQuery<{
    items: CategoryDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [categoriesQueryKey, query],
    queryFn: ({ signal }) => getCategories(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Category by ID Hook */
export function useCategoryById(id: string) {
  return useQuery<CategoryDTO>({
    queryKey: [...categoriesQueryKey, id],
    queryFn: ({ signal }) => getCategoryById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Category by Slug Hook */
export function useCategoryBySlug(slug: string) {
  return useQuery<CategoryDTO>({
    queryKey: [...categoriesQueryKey, "slug", slug],
    queryFn: ({ signal }) => getCategoryBySlug(slug, signal),
    enabled: !!slug,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Category Hook */
export function useCreateCategory(onSuccessCallback?: () => void) {
  return useAppMutation<CreateCategoryInput>(createCategory, {
    onSuccessMessage: "Category created successfully!",
    onSuccessCallback,
    invalidateKeys: categoriesQueryKey,
  });
}

/** Update Category Hook */
export function useUpdateCategory(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateCategoryInput>(updateCategory, {
    onSuccessMessage: "Category updated successfully!",
    onSuccessCallback,
    invalidateKeys: categoriesQueryKey,
  });
}

/** Delete Category Hook */
export function useDeleteCategory(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteCategory, {
    onSuccessMessage: "Category deleted successfully!",
    onSuccessCallback,
    invalidateKeys: categoriesQueryKey,
  });
}

/** Toggle Popular Hook */
export function useTogglePopularCategory(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; isPopular: boolean }>(
    ({ id, isPopular }) => togglePopularCategory(id, isPopular),
    {
      onSuccessMessage: "Category popularity updated!",
      onSuccessCallback,
      invalidateKeys: categoriesQueryKey,
    }
  );
}

/** Update Category Status Hook */
export function useUpdateStatusCategory(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; status: CategoryDTO["status"] }>(
    ({ id, status }) => updateStatusCategory(id, status),
    {
      onSuccessMessage: "Category status updated!",
      onSuccessCallback,
      invalidateKeys: categoriesQueryKey,
    }
  );
}
