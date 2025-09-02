import { useQuery } from "@tanstack/react-query";
import {
  getFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
  updateFaqStatus,
} from "@/lib/api";
import type {
  CreateFaqInput,
  UpdateFaqInput,
  FaqListQueryInput,
} from "@/lib/validators";
import type { FaqDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const faqsQueryKey = ["faqs"];

/** Get FAQs (List) Hook */
export function useFaqs(query?: FaqListQueryInput) {
  return useQuery<{
    items: FaqDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [faqsQueryKey, query],
    queryFn: ({ signal }) => getFaqs(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get FAQ by ID Hook */
export function useFaqById(id: string) {
  return useQuery<FaqDTO>({
    queryKey: [...faqsQueryKey, id],
    queryFn: ({ signal }) => getFaqById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create FAQ Hook */
export function useCreateFaq(onSuccessCallback?: () => void) {
  return useAppMutation<CreateFaqInput>(createFaq, {
    onSuccessMessage: "FAQ created successfully!",
    onSuccessCallback,
    invalidateKeys: faqsQueryKey,
  });
}

/** Update FAQ Hook */
export function useUpdateFaq(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateFaqInput>(updateFaq, {
    onSuccessMessage: "FAQ updated successfully!",
    onSuccessCallback,
    invalidateKeys: faqsQueryKey,
  });
}

/** Delete FAQ Hook */
export function useDeleteFaq(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteFaq, {
    onSuccessMessage: "FAQ deleted successfully!",
    onSuccessCallback,
    invalidateKeys: faqsQueryKey,
  });
}

/** Update FAQ Status Hook */
export function useUpdateFaqStatus(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; status: FaqDTO["status"] }>(
    ({ id, status }) => updateFaqStatus(id, status),
    {
      onSuccessMessage: "FAQ status updated successfully!",
      onSuccessCallback,
      invalidateKeys: faqsQueryKey,
    }
  );
}
