import { FacultyDTO } from "@/lib/services";
import {
  CreateFacultyInput,
  UpdateFacultyInput,
  FacultyListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of faculties (Public) */
export async function getFaculties(
  params?: FacultyListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: FacultyDTO[];
  nextCursor?: string;
  total?: number; // optional expensive count, enable when needed
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: FacultyDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/faculties?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get faculty by ID (Public) */
export async function getFacultyById(
  id: string,
  signal?: AbortSignal
): Promise<FacultyDTO> {
  return apiRequest<FacultyDTO>(`/api/faculties/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get faculty by name (Public) */
export async function getFacultyByName(
  name: string,
  signal?: AbortSignal
): Promise<FacultyDTO> {
  return apiRequest<FacultyDTO>(
    `/api/faculties/name/${encodeURIComponent(name)}`,
    {
      method: "GET",
      cache: "no-store",
      signal,
    }
  );
}

/** Create faculty (Protected) */
export async function createFaculty(
  input: CreateFacultyInput,
  signal?: AbortSignal
): Promise<FacultyDTO> {
  return apiRequest<FacultyDTO>(`/api/faculties`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update faculty (Protected) */
export async function updateFaculty(
  input: UpdateFacultyInput,
  signal?: AbortSignal
): Promise<FacultyDTO> {
  return apiRequest<FacultyDTO>(`/api/faculties/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete faculty (Protected) */
export async function deleteFaculty(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/faculties/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Update faculty image (Protected) */
export async function updateFacultyImage(
  id: string,
  imageUrl: string,
  signal?: AbortSignal
): Promise<FacultyDTO> {
  return apiRequest<FacultyDTO>(`/api/faculties/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ image: imageUrl }),
    cache: "no-store",
    signal,
  });
}

/** Update faculty designation (Protected) */
export async function updateFacultyDesignation(
  id: string,
  designation: string,
  signal?: AbortSignal
): Promise<FacultyDTO> {
  return apiRequest<FacultyDTO>(`/api/faculties/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ designation }),
    cache: "no-store",
    signal,
  });
}
