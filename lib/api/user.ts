import { UserDTO } from "@/lib/services";
import {
  CreateUserInput,
  UpdateUserInput,
  UserListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** ===========================
 *  PUBLIC AUTH ROUTES
 * =========================== *

/** Get current logged-in user profile (Protected) */
export async function getCurrentUser(signal?: AbortSignal): Promise<UserDTO> {
  return apiRequest<UserDTO>(`/api/users/me`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Update current user profile (Protected) */
export async function updateCurrentUser(
  input: Partial<UpdateUserInput>,
  signal?: AbortSignal
): Promise<UserDTO> {
  return apiRequest<UserDTO>(`/api/users/me`, {
    method: "PATCH",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** ===========================
 *  ADMIN ROUTES
 * =========================== */

/** Get list of users (Admin only) */
export async function getUsers(
  params?: UserListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: UserDTO[];
  nextCursor?: string;
  total?: number;
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: UserDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/users?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get user by ID (Admin only) */
export async function getUserById(
  id: string,
  signal?: AbortSignal
): Promise<UserDTO> {
  return apiRequest<UserDTO>(`/api/users/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create user (Admin only) */
export async function createUser(
  input: CreateUserInput,
  signal?: AbortSignal
): Promise<UserDTO> {
  return apiRequest<UserDTO>(`/api/users`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update user (Admin only) */
export async function updateUser(
  input: UpdateUserInput,
  signal?: AbortSignal
): Promise<UserDTO> {
  return apiRequest<UserDTO>(`/api/users/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete user (Admin only) */
export async function deleteUser(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/users/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Update user role (Admin only) */
export async function updateUserRole(
  id: string,
  role: UserDTO["role"],
  signal?: AbortSignal
): Promise<UserDTO> {
  return apiRequest<UserDTO>(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
    cache: "no-store",
    signal,
  });
}

/** Update user profile image (Self or Admin) */
export async function updateUserImage(
  id: string,
  imageUrl: string,
  signal?: AbortSignal
): Promise<UserDTO> {
  return apiRequest<UserDTO>(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ image: imageUrl }),
    cache: "no-store",
    signal,
  });
}
