import { BannerDTO } from "@/lib/services";
import {
  CreateBannerInput,
  UpdateBannerInput,
  BannerListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of banners (Public) */
export async function getBanners(
  params?: BannerListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: BannerDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: BannerDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/banners?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get banner by ID (Public) */
export async function getBannerById(
  id: string,
  signal?: AbortSignal
): Promise<BannerDTO> {
  return apiRequest<BannerDTO>(`/api/banners/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create banner (Protected) */
export async function createBanner(
  input: CreateBannerInput,
  signal?: AbortSignal
): Promise<BannerDTO> {
  return apiRequest<BannerDTO>(`/api/banners`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update banner (Protected) */
export async function updateBanner(
  input: UpdateBannerInput,
  signal?: AbortSignal
): Promise<BannerDTO> {
  return apiRequest<BannerDTO>(`/api/banners/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete banner (Protected) */
export async function deleteBanner(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/banners/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}
