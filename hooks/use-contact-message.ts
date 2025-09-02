import { useQuery } from "@tanstack/react-query";
import {
  getContactMessages,
  getContactMessageById,
  createContactMessage,
  deleteContactMessage,
} from "@/lib/api";
import type {
  CreateContactMessageInput,
  ContactMessageListQueryInput,
} from "@/lib/validators";
import type { ContactMessageDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const contactMessagesQueryKey = ["contact-messages"];

/** Get Contact Messages Hook (List) */
export function useContactMessages(query?: ContactMessageListQueryInput) {
  return useQuery<{
    items: ContactMessageDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [contactMessagesQueryKey, query],
    queryFn: ({ signal }) => getContactMessages(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Contact Message by ID Hook */
export function useContactMessageById(id: string) {
  return useQuery<ContactMessageDTO>({
    queryKey: [...contactMessagesQueryKey, id],
    queryFn: ({ signal }) => getContactMessageById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Contact Message Hook */
export function useCreateContactMessage(onSuccessCallback?: () => void) {
  return useAppMutation<CreateContactMessageInput>(createContactMessage, {
    onSuccessMessage: "Message sent successfully!",
    onSuccessCallback,
    invalidateKeys: contactMessagesQueryKey,
  });
}

/** Delete Contact Message Hook */
export function useDeleteContactMessage(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteContactMessage, {
    onSuccessMessage: "Message deleted successfully!",
    onSuccessCallback,
    invalidateKeys: contactMessagesQueryKey,
  });
}
