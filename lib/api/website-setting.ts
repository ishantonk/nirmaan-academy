import { WebsiteSettingDTO } from "@/lib/services";
import {
  CreateWebsiteSettingInput,
  UpdateWebsiteSettingInput,
} from "@/lib/validators";
import { apiRequest } from "@/lib/api/utils";

/** Get website setting (Public) */
export async function getWebsiteSetting(
  signal?: AbortSignal
): Promise<WebsiteSettingDTO> {
  return apiRequest<WebsiteSettingDTO>(`/api/website-setting`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create website setting (Protected) - single setting */
export async function createWebsiteSetting(
  input: CreateWebsiteSettingInput,
  signal?: AbortSignal
): Promise<WebsiteSettingDTO> {
  return apiRequest<WebsiteSettingDTO>(`/api/website-setting`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update website settings (Protected) - single setting */
export async function updateWebsiteSetting(
  input: UpdateWebsiteSettingInput,
  signal?: AbortSignal
): Promise<WebsiteSettingDTO> {
  return apiRequest<WebsiteSettingDTO>(`/api/website-setting/update`, {
    method: "PATCH",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}
