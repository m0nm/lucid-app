import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { Notebook } from "@/types";
import { notebooksKey } from "@/constants/query-keys";
import { updateLocalNotebook } from "@/utils";

export const useUpdateNotebook = (notebookId: string) => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  return useMutation<Notebook, Error, string>({
    mutationFn: (newName) => mutateFn(isAuth, notebookId, newName),
    onSuccess: () => {
      queryClient.invalidateQueries(notebooksKey);
    },
  });
};

async function mutateFn(isAuth: boolean, notebookId: string, newName: string) {
  if (isAuth)
    return await axios.put<Notebook, Notebook>(`/notebooks/${notebookId}`, {
      name: newName,
    });

  return new Promise<Notebook>((res, rej) => {
    try {
      const notebook = updateLocalNotebook(notebookId, newName);
      if (!notebook) throw Error;

      res(notebook);
    } catch (error) {
      rej(error);
    }
  });
}
