import { NoticeDTO } from "@/lib/services";
import {
  CreateNoticeInput,
  UpdateNoticeInput,
  NoticeListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of notices (Public) */
export async function getNotices(
  params?: NoticeListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: NoticeDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: NoticeDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/notices?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get notice by ID (Public) */
export async function getNoticeById(
  id: string,
  signal?: AbortSignal
): Promise<NoticeDTO> {
  return apiRequest<NoticeDTO>(`/api/notices/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create notice (Protected) */
export async function createNotice(
  input: CreateNoticeInput,
  signal?: AbortSignal
): Promise<NoticeDTO> {
  return apiRequest<NoticeDTO>(`/api/notices`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update notice (Protected) */
export async function updateNotice(
  input: UpdateNoticeInput,
  signal?: AbortSignal
): Promise<NoticeDTO> {
  return apiRequest<NoticeDTO>(`/api/notices/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete notice (Protected) */
export async function deleteNotice(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/notices/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Update notice status (Protected) */
export async function updateNoticeStatus(
  id: string,
  status: NoticeDTO["status"],
  signal?: AbortSignal
): Promise<NoticeDTO> {
  return apiRequest<NoticeDTO>(`/api/notices/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
    signal,
  });
}
