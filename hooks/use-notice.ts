import { useQuery } from "@tanstack/react-query";
import {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
  updateNoticeStatus,
} from "@/lib/api";
import type {
  CreateNoticeInput,
  UpdateNoticeInput,
  NoticeListQueryInput,
} from "@/lib/validators";
import type { NoticeDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const noticesQueryKey = ["notices"];

/** Get Notices (List) Hook */
export function useNotices(query?: NoticeListQueryInput) {
  return useQuery<{
    items: NoticeDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [noticesQueryKey, query],
    queryFn: ({ signal }) => getNotices(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Notice by ID Hook */
export function useNoticeById(id: string) {
  return useQuery<NoticeDTO>({
    queryKey: [...noticesQueryKey, id],
    queryFn: ({ signal }) => getNoticeById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Notice Hook */
export function useCreateNotice(onSuccessCallback?: () => void) {
  return useAppMutation<CreateNoticeInput>(createNotice, {
    onSuccessMessage: "Notice created successfully!",
    onSuccessCallback,
    invalidateKeys: noticesQueryKey,
  });
}

/** Update Notice Hook */
export function useUpdateNotice(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateNoticeInput>(updateNotice, {
    onSuccessMessage: "Notice updated successfully!",
    onSuccessCallback,
    invalidateKeys: noticesQueryKey,
  });
}

/** Delete Notice Hook */
export function useDeleteNotice(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteNotice, {
    onSuccessMessage: "Notice deleted successfully!",
    onSuccessCallback,
    invalidateKeys: noticesQueryKey,
  });
}

/** Update Notice Status Hook */
export function useUpdateNoticeStatus(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; status: NoticeDTO["status"] }>(
    ({ id, status }) => updateNoticeStatus(id, status),
    {
      onSuccessMessage: "Notice status updated successfully!",
      onSuccessCallback,
      invalidateKeys: noticesQueryKey,
    }
  );
}
