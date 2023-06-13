import { useCallback } from "react";
import { axios } from "@/lib/axios";
import { User } from "@/lib/auth";
import { userKey } from "@/constants/query-keys";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

type UpdateValues =
  | { avatar: string }
  | { email: string; password: string }
  | { password: string; newPassword: string };

type MutationVariables = { userId: string; updateValues: UpdateValues };

export const useUpdateAccount = (
  options?: Omit<
    UseMutationOptions<User, Error, MutationVariables>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  const setUser = useCallback(
    (data: User) => {
      queryClient.setQueryData(userKey, data);
    },
    [userKey]
  );

  return useMutation<User, Error, MutationVariables>(mutationFn, {
    onSuccess: (user, variables, ...rest) => {
      setUser(user);
      options?.onSuccess?.(user, variables, ...rest);
    },
  });
};

async function mutationFn(params: MutationVariables) {
  return await axios.put<User, User>(
    `/users/${params.userId}`,
    params.updateValues
  );
}
