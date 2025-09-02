import { useQuery } from "@tanstack/react-query";
import {
  getBlogCategories,
  getBlogCategoryById,
  getBlogCategoryBySlug,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  togglePopularBlogCategory,
  updateStatusBlogCategory,
} from "@/lib/api";
import type {
  CreateBlogCategoryInput,
  UpdateBlogCategoryInput,
  BlogCategoryListQueryInput,
} from "@/lib/validators";
import { BlogCategoryDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const blogCategoriesQueryKey = ["blogCategories"];

/** Get Blog Categories Hook (List) */
export function useBlogCategories(query?: BlogCategoryListQueryInput) {
  return useQuery<{
    items: BlogCategoryDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [blogCategoriesQueryKey, query],
    queryFn: ({ signal }) => getBlogCategories(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
}

/** Get Single Blog Category by ID Hook */
export function useBlogCategoryById(id: string) {
  return useQuery<BlogCategoryDTO>({
    queryKey: [...blogCategoriesQueryKey, id],
    queryFn: ({ signal }) => getBlogCategoryById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Single Blog Category by Slug Hook */
export function useBlogCategoryBySlug(slug: string) {
  return useQuery<BlogCategoryDTO>({
    queryKey: [...blogCategoriesQueryKey, "slug", slug],
    queryFn: ({ signal }) => getBlogCategoryBySlug(slug, signal),
    enabled: !!slug,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Blog Category Hook */
export function useCreateBlogCategory(onSuccessCallback?: () => void) {
  return useAppMutation<CreateBlogCategoryInput>(createBlogCategory, {
    onSuccessMessage: "Blog category created successfully!",
    onSuccessCallback,
    invalidateKeys: blogCategoriesQueryKey,
  });
}

/** Update Blog Category Hook */
export function useUpdateBlogCategory(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateBlogCategoryInput>(updateBlogCategory, {
    onSuccessMessage: "Blog category updated successfully!",
    onSuccessCallback,
    invalidateKeys: blogCategoriesQueryKey,
  });
}

/** Delete Blog Category Hook */
export function useDeleteBlogCategory(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteBlogCategory, {
    onSuccessMessage: "Blog category deleted successfully!",
    onSuccessCallback,
    invalidateKeys: blogCategoriesQueryKey,
  });
}

/** Toggle Blog Category Popular Hook */
export function useTogglePopularBlogCategory(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; isPopular: boolean }>(
    ({ id, isPopular }) => togglePopularBlogCategory(id, isPopular),
    {
      onSuccessMessage: "Blog category popularity updated!",
      onSuccessCallback,
      invalidateKeys: blogCategoriesQueryKey,
    }
  );
}

/** Update Blog Category Status Hook */
export function useUpdateStatusBlogCategory(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; status: BlogCategoryDTO["status"] }>(
    ({ id, status }) => updateStatusBlogCategory(id, status),
    {
      onSuccessMessage: "Blog category status updated!",
      onSuccessCallback,
      invalidateKeys: blogCategoriesQueryKey,
    }
  );
}
