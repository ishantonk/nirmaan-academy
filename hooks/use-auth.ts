import { login, register } from "@/lib/api/auth";
import type { LoginInput, RegisterInput } from "@/lib/validators";
import type { UserDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

/** Key for Auth-related mutations */
export const authQueryKey = ["auth"];

/** Login Hook (Not-used) */
export function useLogin(onSuccessCallback?: () => void) {
  return useAppMutation<LoginInput, { user: UserDTO; token: string }>(login, {
    onSuccessMessage: "Logged in successfully!",
    onSuccessCallback,
    invalidateKeys: authQueryKey,
  });
}

/** Register Hook */
export function useRegister(onSuccessCallback?: () => void) {
  return useAppMutation<RegisterInput, { user: UserDTO; token: string }>(
    register,
    {
      onSuccessMessage: "Account created successfully!",
      onSuccessCallback,
      invalidateKeys: authQueryKey,
    }
  );
}
