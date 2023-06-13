import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { Notebook, Topic } from "@/types";
import { createLocalNotebook } from "@/utils";
import { notebooksKey } from "@/constants/query-keys";

type NotebookCreate = { name: string; topics?: Topic[] };

export const useCreateNotebook = () => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  return useMutation<Notebook, Error, NotebookCreate>({
    mutationFn: (data) => mutateFn(isAuth, data),
    onSuccess: () => {
      if (isAuth) queryClient.invalidateQueries(notebooksKey);
    },
  });
};

async function mutateFn(isAuth: boolean, data: NotebookCreate) {
  if (isAuth) return await axios.post<Notebook, Notebook>("/notebooks", data);

  return new Promise<Notebook>((res, rej) => {
    try {
      const notebook = createLocalNotebook(data.name, data.topics);
      res(notebook);
    } catch (error) {
      rej(error);
    }
  });
}
