import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { useIsAuth } from "@/lib/auth";
import { deleteLocalNotebook } from "@/utils";
import { notebooksKey } from "@/constants/query-keys";

export const useDeleteNotebook = (notebookId: string) => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  return useMutation({
    mutationFn: async () => mutateFn(isAuth, notebookId),
    onSuccess: () => {

      if (isAuth) {
        queryClient.invalidateQueries(notebooksKey);
      }
    },
  });
};

async function mutateFn(isAuth: boolean, notebookId: string) {
  if (isAuth) return await axios.delete(`notebooks/${notebookId}`);

  return new Promise((res, rej) => {
    try {
      deleteLocalNotebook(notebookId);
      res(true);
    } catch (error) {
      rej(error);
    }
  });
}
