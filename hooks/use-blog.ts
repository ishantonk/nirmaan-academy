import { useQuery } from "@tanstack/react-query";
import {
  getBlogPosts,
  getBlogPostById,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  publishBlogPost,
} from "@/lib/api";
import type {
  CreateBlogPostInput,
  UpdateBlogPostInput,
  BlogPostListQueryInput,
} from "@/lib/validators";
import type { BlogPostDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const blogPostsQueryKey = ["blogPosts"];

/** Get Blog Posts Hook (List) */
export function useBlogPosts(query?: BlogPostListQueryInput) {
  return useQuery<{
    items: BlogPostDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [blogPostsQueryKey, query],
    queryFn: ({ signal }) => getBlogPosts(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60, // 1 min
    retry: 2,
  });
}

/** Get Single Blog Post by ID Hook */
export function useBlogPostById(id: string) {
  return useQuery<BlogPostDTO>({
    queryKey: [...blogPostsQueryKey, id],
    queryFn: ({ signal }) => getBlogPostById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Single Blog Post by Slug Hook */
export function useBlogPostBySlug(slug: string) {
  return useQuery<BlogPostDTO>({
    queryKey: [...blogPostsQueryKey, "slug", slug],
    queryFn: ({ signal }) => getBlogPostBySlug(slug, signal),
    enabled: !!slug,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Blog Post Hook */
export function useCreateBlogPost(onSuccessCallback?: () => void) {
  return useAppMutation<CreateBlogPostInput>(createBlogPost, {
    onSuccessMessage: "Blog post created successfully!",
    onSuccessCallback,
    invalidateKeys: blogPostsQueryKey,
  });
}

/** Update Blog Post Hook */
export function useUpdateBlogPost(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateBlogPostInput>(updateBlogPost, {
    onSuccessMessage: "Blog post updated successfully!",
    onSuccessCallback,
    invalidateKeys: blogPostsQueryKey,
  });
}

/** Delete Blog Post Hook */
export function useDeleteBlogPost(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteBlogPost, {
    onSuccessMessage: "Blog post deleted successfully!",
    onSuccessCallback,
    invalidateKeys: blogPostsQueryKey,
  });
}

/** Publish Blog Post Hook */
export function usePublishBlogPost(onSuccessCallback?: () => void) {
  return useAppMutation<{ slug: string }>(({ slug }) => publishBlogPost(slug), {
    onSuccessMessage: "Blog post published!",
    onSuccessCallback,
    invalidateKeys: blogPostsQueryKey,
  });
}
