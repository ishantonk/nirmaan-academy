import { useQuery } from "@tanstack/react-query";
import {
  getEbookCategories,
  getEbookCategoryById,
  getEbookCategoryBySlug,
  createEbookCategory,
  updateEbookCategory,
  deleteEbookCategory,
  updateStatusEbookCategory,
  togglePopularEbookCategory,
} from "@/lib/api";
import type {
  CreateEbookCategoryInput,
  UpdateEbookCategoryInput,
  EbookCategoryListQueryInput,
} from "@/lib/validators";
import { EbookCategoryDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const ebookCategoriesQueryKey = ["ebook-categories"];

/** Get Ebook Categories Hook (List) */
export function useEbookCategories(query?: EbookCategoryListQueryInput) {
  return useQuery<{
    items: EbookCategoryDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [ebookCategoriesQueryKey, query],
    queryFn: ({ signal }) => getEbookCategories(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Ebook Category by ID Hook */
export function useEbookCategoryById(id: string) {
  return useQuery<EbookCategoryDTO>({
    queryKey: [...ebookCategoriesQueryKey, id],
    queryFn: ({ signal }) => getEbookCategoryById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Ebook Category by Slug Hook */
export function useEbookCategoryBySlug(slug: string) {
  return useQuery<EbookCategoryDTO>({
    queryKey: [...ebookCategoriesQueryKey, "slug", slug],
    queryFn: ({ signal }) => getEbookCategoryBySlug(slug, signal),
    enabled: !!slug,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Ebook Category Hook */
export function useCreateEbookCategory(onSuccessCallback?: () => void) {
  return useAppMutation<CreateEbookCategoryInput>(createEbookCategory, {
    onSuccessMessage: "Ebook category created successfully!",
    onSuccessCallback,
    invalidateKeys: ebookCategoriesQueryKey,
  });
}

/** Update Ebook Category Hook */
export function useUpdateEbookCategory(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateEbookCategoryInput>(updateEbookCategory, {
    onSuccessMessage: "Ebook category updated successfully!",
    onSuccessCallback,
    invalidateKeys: ebookCategoriesQueryKey,
  });
}

/** Delete Ebook Category Hook */
export function useDeleteEbookCategory(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteEbookCategory, {
    onSuccessMessage: "Ebook category deleted successfully!",
    onSuccessCallback,
    invalidateKeys: ebookCategoriesQueryKey,
  });
}

/** Toggle Popular Hook */
export function useTogglePopularEbookCategory(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; isPopular: boolean }>(
    ({ id, isPopular }) => togglePopularEbookCategory(id, isPopular),
    {
      onSuccessMessage: "Ebook category popularity updated!",
      onSuccessCallback,
      invalidateKeys: ebookCategoriesQueryKey,
    }
  );
}

/** Update Status Hook */
export function useUpdateStatusEbookCategory(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; status: EbookCategoryDTO["status"] }>(
    ({ id, status }) => updateStatusEbookCategory(id, status),
    {
      onSuccessMessage: "Ebook category status updated successfully!",
      onSuccessCallback,
      invalidateKeys: ebookCategoriesQueryKey,
    }
  );
}
