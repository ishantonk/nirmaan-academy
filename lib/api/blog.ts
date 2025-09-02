import { BlogPostDTO } from "@/lib/services";
import {
  CreateBlogPostInput,
  UpdateBlogPostInput,
  BlogPostListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of blog posts (Public) */
export async function getBlogPosts(
  params?: BlogPostListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: BlogPostDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: BlogPostDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/blog?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get blog post by ID (Public) */
export async function getBlogPostById(
  id: string,
  signal?: AbortSignal
): Promise<BlogPostDTO> {
  const queryString = toSearchParams({ id: id });
  return apiRequest<BlogPostDTO>(`/api/blog?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get blog post by slug (Public) */
export async function getBlogPostBySlug(
  slug: string,
  signal?: AbortSignal
): Promise<BlogPostDTO> {
  return apiRequest<BlogPostDTO>(`/api/blog/${slug}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create blog post (Protected) */
export async function createBlogPost(
  input: CreateBlogPostInput,
  signal?: AbortSignal
): Promise<BlogPostDTO> {
  return apiRequest<BlogPostDTO>(`/api/blog`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update blog post (Protected) */
export async function updateBlogPost(
  input: UpdateBlogPostInput,
  signal?: AbortSignal
): Promise<BlogPostDTO> {
  return apiRequest<BlogPostDTO>(`/api/blog/${input.slug}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete blog post (Protected) */
export async function deleteBlogPost(
  slug: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/blog/${slug}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Publish blog post (Protected) */
export async function publishBlogPost(
  slug: string,
  signal?: AbortSignal
): Promise<BlogPostDTO> {
  return apiRequest<BlogPostDTO>(`/api/blog/${slug}/publish`, {
    method: "PATCH",
    cache: "no-store",
    signal,
  });
}
