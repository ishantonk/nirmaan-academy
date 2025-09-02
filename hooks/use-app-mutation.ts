import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Generic mutation helper:
 * Handles:
 * - Cache invalidation
 * - Success callback
 * - Error alerts
 */
function useAppMutation<TVariables, TData = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccessMessage?: string;
    onSuccessCallback?: () => void;
    invalidateKeys?: string[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: () => {
      if (options?.invalidateKeys) {
        queryClient.invalidateQueries({ queryKey: options.invalidateKeys });
      }
      if (options?.onSuccessCallback) {
        options.onSuccessCallback();
      }
      if (options?.onSuccessMessage) {
        alert(options.onSuccessMessage);
      }
    },
    onError: (error: any) => {
      alert(error?.message || "An error occurred. Please try again.");
    },
  });
}

export default useAppMutation;
