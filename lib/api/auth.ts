import type {
  LoginInput,
  RegisterInput,
//   ResetPasswordInput,
//   VerifyEmailInput,
//   ChangePasswordInput,
} from "@/lib/validators";
import type { UserDTO } from "@/lib/services";
import { apiRequest } from "@/lib/api/utils";

/** Login (Public) */
export async function login(
  input: LoginInput
): Promise<{ user: UserDTO; token: string }> {
  return apiRequest<{ user: UserDTO; token: string }>(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
  });
}

/** Register (Public) */
export async function register(
  input: RegisterInput
): Promise<{ user: UserDTO; token: string }> {
  return apiRequest<{ user: UserDTO; token: string }>(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
  });
}

// /** Verify Email (Public) */
// export async function verifyEmail(
//   input: VerifyEmailInput
// ): Promise<{ message: string }> {
//   return apiRequest<{ message: string }>(`/api/auth/verify-email`, {
//     method: "POST",
//     body: JSON.stringify(input),
//     cache: "no-store",
//   });
// }

// /** Reset Password (Public) */
// export async function resetPassword(
//   input: ResetPasswordInput
// ): Promise<{ message: string }> {
//   return apiRequest<{ message: string }>(`/api/auth/reset-password`, {
//     method: "POST",
//     body: JSON.stringify(input),
//     cache: "no-store",
//   });
// }

// /** Change Password (Protected) */
// export async function changePassword(
//   input: ChangePasswordInput
// ): Promise<{ message: string }> {
//   return apiRequest<{ message: string }>(`/api/auth/change-password`, {
//     method: "POST",
//     body: JSON.stringify(input),
//     cache: "no-store",
//   });
// }
