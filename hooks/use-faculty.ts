import { useQuery } from "@tanstack/react-query";
import {
  getFaculties,
  getFacultyById,
  getFacultyByName,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  updateFacultyImage,
  updateFacultyDesignation,
} from "@/lib/api";
import type {
  CreateFacultyInput,
  UpdateFacultyInput,
  FacultyListQueryInput,
} from "@/lib/validators";
import type { FacultyDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const facultiesQueryKey = ["faculties"];

/** Get Faculties Hook (List) */
export function useFaculties(query?: FacultyListQueryInput) {
  return useQuery<{
    items: FacultyDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [facultiesQueryKey, query],
    queryFn: ({ signal }) => getFaculties(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Faculty by ID Hook */
export function useFacultyById(id: string) {
  return useQuery<FacultyDTO>({
    queryKey: [...facultiesQueryKey, id],
    queryFn: ({ signal }) => getFacultyById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Faculty by Name Hook */
export function useFacultyByName(name: string) {
  return useQuery<FacultyDTO>({
    queryKey: [...facultiesQueryKey, "name", name],
    queryFn: ({ signal }) => getFacultyByName(name, signal),
    enabled: !!name,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Faculty Hook */
export function useCreateFaculty(onSuccessCallback?: () => void) {
  return useAppMutation<CreateFacultyInput>(createFaculty, {
    onSuccessMessage: "Faculty created successfully!",
    onSuccessCallback,
    invalidateKeys: facultiesQueryKey,
  });
}

/** Update Faculty Hook */
export function useUpdateFaculty(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateFacultyInput>(updateFaculty, {
    onSuccessMessage: "Faculty updated successfully!",
    onSuccessCallback,
    invalidateKeys: facultiesQueryKey,
  });
}

/** Delete Faculty Hook */
export function useDeleteFaculty(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteFaculty, {
    onSuccessMessage: "Faculty deleted successfully!",
    onSuccessCallback,
    invalidateKeys: facultiesQueryKey,
  });
}

/** Update Faculty Image Hook */
export function useUpdateFacultyImage(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; imageUrl: string }>(
    ({ id, imageUrl }) => updateFacultyImage(id, imageUrl),
    {
      onSuccessMessage: "Faculty image updated successfully!",
      onSuccessCallback,
      invalidateKeys: facultiesQueryKey,
    }
  );
}

/** Update Faculty Designation Hook */
export function useUpdateFacultyDesignation(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; designation: string }>(
    ({ id, designation }) => updateFacultyDesignation(id, designation),
    {
      onSuccessMessage: "Faculty designation updated successfully!",
      onSuccessCallback,
      invalidateKeys: facultiesQueryKey,
    }
  );
}
