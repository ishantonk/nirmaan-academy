import { useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  updateCurrentUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
  updateUserImage,
} from "@/lib/api";
import type {
  CreateUserInput,
  UpdateUserInput,
  UserListQueryInput,
} from "@/lib/validators";
import type { UserDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const usersQueryKey = ["users"];
export const currentUserQueryKey = ["currentUser"];

/** Get Current User (Self) */
export function useCurrentUser() {
  return useQuery<UserDTO>({
    queryKey: currentUserQueryKey,
    queryFn: ({ signal }) => getCurrentUser(signal),
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
}

/** Update Current User (Self) */
export function useUpdateCurrentUser(onSuccessCallback?: () => void) {
  return useAppMutation<Partial<UpdateUserInput>>(updateCurrentUser, {
    onSuccessMessage: "Profile updated successfully!",
    onSuccessCallback,
    invalidateKeys: usersQueryKey,
  });
}

/** Get Users (Admin) */
export function useUsers(query?: UserListQueryInput) {
  return useQuery<{
    items: UserDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [usersQueryKey, query],
    queryFn: ({ signal }) => getUsers(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get User By ID (Admin) */
export function useUserById(id: string) {
  return useQuery<UserDTO>({
    queryKey: [...usersQueryKey, id],
    queryFn: ({ signal }) => getUserById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create User (Admin) */
export function useCreateUser(onSuccessCallback?: () => void) {
  return useAppMutation<CreateUserInput>(createUser, {
    onSuccessMessage: "User created successfully!",
    onSuccessCallback,
    invalidateKeys: usersQueryKey,
  });
}

/** Update User (Admin) */
export function useUpdateUser(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateUserInput>(updateUser, {
    onSuccessMessage: "User updated successfully!",
    onSuccessCallback,
    invalidateKeys: usersQueryKey,
  });
}

/** Delete User (Admin) */
export function useDeleteUser(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteUser, {
    onSuccessMessage: "User deleted successfully!",
    onSuccessCallback,
    invalidateKeys: usersQueryKey,
  });
}

/** Update User Role (Admin) */
export function useUpdateUserRole(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; role: UserDTO["role"] }>(
    ({ id, role }) => updateUserRole(id, role),
    {
      onSuccessMessage: "User role updated successfully!",
      onSuccessCallback,
      invalidateKeys: usersQueryKey,
    }
  );
}

/** Update User Image (Self or Admin) */
export function useUpdateUserImage(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; imageUrl: string }>(
    ({ id, imageUrl }) => updateUserImage(id, imageUrl),
    {
      onSuccessMessage: "Profile image updated successfully!",
      onSuccessCallback,
      invalidateKeys: usersQueryKey,
    }
  );
}
