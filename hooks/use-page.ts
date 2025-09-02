import { useQuery } from "@tanstack/react-query";
import {
  getPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  updatePageStatus,
} from "@/lib/api";
import type {
  CreatePageInput,
  UpdatePageInput,
  PageListQueryInput,
} from "@/lib/validators";
import type { PageDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const pagesQueryKey = ["pages"];

/** Get Pages (List) Hook */
export function usePages(query?: PageListQueryInput) {
  return useQuery<{
    items: PageDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [pagesQueryKey, query],
    queryFn: ({ signal }) => getPages(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Page by ID Hook */
export function usePageById(id: string) {
  return useQuery<PageDTO>({
    queryKey: [...pagesQueryKey, id],
    queryFn: ({ signal }) => getPageById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Page Hook */
export function useCreatePage(onSuccessCallback?: () => void) {
  return useAppMutation<CreatePageInput>(createPage, {
    onSuccessMessage: "Page created successfully!",
    onSuccessCallback,
    invalidateKeys: pagesQueryKey,
  });
}

/** Update Page Hook */
export function useUpdatePage(onSuccessCallback?: () => void) {
  return useAppMutation<UpdatePageInput>(updatePage, {
    onSuccessMessage: "Page updated successfully!",
    onSuccessCallback,
    invalidateKeys: pagesQueryKey,
  });
}

/** Delete Page Hook */
export function useDeletePage(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deletePage, {
    onSuccessMessage: "Page deleted successfully!",
    onSuccessCallback,
    invalidateKeys: pagesQueryKey,
  });
}

/** Update Page Status Hook */
export function useUpdatePageStatus(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; status: PageDTO["status"] }>(
    ({ id, status }) => updatePageStatus(id, status),
    {
      onSuccessMessage: "Page status updated successfully!",
      onSuccessCallback,
      invalidateKeys: pagesQueryKey,
    }
  );
}
