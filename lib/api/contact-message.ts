import { ContactMessageDTO } from "@/lib/services";
import {
  CreateContactMessageInput,
  ContactMessageListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of contact messages (Protected - Admin only) */
export async function getContactMessages(
  params?: ContactMessageListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: ContactMessageDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: ContactMessageDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/contact-messages?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get contact message by ID (Protected) */
export async function getContactMessageById(
  id: string,
  signal?: AbortSignal
): Promise<ContactMessageDTO> {
  return apiRequest<ContactMessageDTO>(`/api/contact-messages/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create contact message (Public) */
export async function createContactMessage(
  input: CreateContactMessageInput,
  signal?: AbortSignal
): Promise<ContactMessageDTO> {
  return apiRequest<ContactMessageDTO>(`/api/contact-messages`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete contact message (Protected) */
export async function deleteContactMessage(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/contact-messages/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}
