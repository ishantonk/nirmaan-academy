import { useQuery } from "@tanstack/react-query";
import {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} from "@/lib/api";
import type {
  CreateBannerInput,
  UpdateBannerInput,
  BannerListQueryInput,
} from "@/lib/validators";
import type { BannerDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const bannersQueryKey = ["banners"];

/** Get Banners Hook (List) */
export function useBanners(query?: BannerListQueryInput) {
  return useQuery<{
    items: BannerDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [bannersQueryKey, query],
    queryFn: ({ signal }) => getBanners(query!, signal),
    placeholderData: (prev) => prev, // keep previous data while fetching
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
}

/** Get Single Banner Hook */
export function useBannerById(id: string) {
  return useQuery<BannerDTO>({
    queryKey: [...bannersQueryKey, id],
    queryFn: ({ signal }) => getBannerById(id, signal),
    enabled: !!id, // only fetch if id exists
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
}

/** Create Banner Hook */
export function useCreateBanner(onSuccessCallback?: () => void) {
  return useAppMutation<CreateBannerInput>(createBanner, {
    onSuccessMessage: "Banner created successfully!",
    onSuccessCallback,
    invalidateKeys: bannersQueryKey,
  });
}

/** Update Banner Hook */
export function useUpdateBanner(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateBannerInput>(updateBanner, {
    onSuccessMessage: "Banner updated successfully!",
    onSuccessCallback,
    invalidateKeys: bannersQueryKey,
  });
}

/** Delete Banner Hook */
export function useDeleteBanner(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteBanner, {
    onSuccessMessage: "Banner deleted successfully!",
    onSuccessCallback,
    invalidateKeys: bannersQueryKey,
  });
}
