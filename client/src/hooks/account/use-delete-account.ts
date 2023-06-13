import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios } from "@/lib/axios";
import { jwt } from "@/utils";

type MutationVariables = { userId: string; password: string };

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, Error, MutationVariables>(mutationFn, {
    onSuccess: () => {
      toast.success("Account deleted");
      queryClient.removeQueries();
      jwt.clearToken();
      navigate("/login");
    },
  });
};

async function mutationFn(data: MutationVariables) {
  return await axios.delete<void, void>(`/users/${data.userId}`, { data });
}
