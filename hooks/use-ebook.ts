import { useQuery } from "@tanstack/react-query";
import {
  getEbooks,
  getEbookById,
  getEbooksByCategory,
  createEbook,
  updateEbook,
  deleteEbook,
  updateEbookStatus,
} from "@/lib/api";
import type {
  CreateEbookInput,
  UpdateEbookInput,
  EbookListQueryInput,
} from "@/lib/validators";
import type { EbookDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const ebooksQueryKey = ["ebooks"];

/** Get Ebooks Hook (List) */
export function useEbooks(query?: EbookListQueryInput) {
  return useQuery<{
    items: EbookDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [ebooksQueryKey, query],
    queryFn: ({ signal }) => getEbooks(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Ebook by ID Hook */
export function useEbookById(id: string) {
  return useQuery<EbookDTO>({
    queryKey: [...ebooksQueryKey, id],
    queryFn: ({ signal }) => getEbookById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Ebooks by Category Hook */
export function useEbooksByCategory(categoryId: string) {
  return useQuery<EbookDTO[]>({
    queryKey: [...ebooksQueryKey, "category", categoryId],
    queryFn: ({ signal }) => getEbooksByCategory(categoryId, signal),
    enabled: !!categoryId,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Ebook Hook */
export function useCreateEbook(onSuccessCallback?: () => void) {
  return useAppMutation<CreateEbookInput>(createEbook, {
    onSuccessMessage: "Ebook created successfully!",
    onSuccessCallback,
    invalidateKeys: ebooksQueryKey,
  });
}

/** Update Ebook Hook */
export function useUpdateEbook(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateEbookInput>(updateEbook, {
    onSuccessMessage: "Ebook updated successfully!",
    onSuccessCallback,
    invalidateKeys: ebooksQueryKey,
  });
}

/** Delete Ebook Hook */
export function useDeleteEbook(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteEbook, {
    onSuccessMessage: "Ebook deleted successfully!",
    onSuccessCallback,
    invalidateKeys: ebooksQueryKey,
  });
}

/** Update Ebook Status Hook */
export function useUpdateEbookStatus(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; status: EbookDTO["status"] }>(
    ({ id, status }) => updateEbookStatus(id, status),
    {
      onSuccessMessage: "Ebook status updated successfully!",
      onSuccessCallback,
      invalidateKeys: ebooksQueryKey,
    }
  );
}
