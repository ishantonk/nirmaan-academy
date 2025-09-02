import { useQuery } from "@tanstack/react-query";
import {
  getWebsiteSetting,
  createWebsiteSetting,
  updateWebsiteSetting,
} from "@/lib/api/website-setting";
import type {
  CreateWebsiteSettingInput,
  UpdateWebsiteSettingInput,
} from "@/lib/validators";
import { WebsiteSettingDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const websiteSettingQueryKey = ["websiteSetting"];

/** Get Website Setting Hook */
export function useWebsiteSetting() {
  return useQuery<WebsiteSettingDTO>({
    queryKey: websiteSettingQueryKey,
    queryFn: ({ signal }) => getWebsiteSetting(signal),
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
}

/** Create Website Setting Hook */
export function useCreateWebsiteSetting(onSuccessCallback?: () => void) {
  return useAppMutation<CreateWebsiteSettingInput>(createWebsiteSetting, {
    onSuccessMessage: "Website setting created successfully!",
    onSuccessCallback,
    invalidateKeys: websiteSettingQueryKey,
  });
}

/** Update Website Setting Hook */
export function useUpdateWebsiteSetting(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateWebsiteSettingInput>(updateWebsiteSetting, {
    onSuccessMessage: "Website setting updated successfully!",
    onSuccessCallback,
    invalidateKeys: websiteSettingQueryKey,
  });
}
