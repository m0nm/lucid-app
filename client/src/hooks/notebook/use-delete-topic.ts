import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios } from "@/lib/axios";
import { useIsAuth } from "@/lib/auth";
import { deleteLocalTopic } from "@/utils";
import { notebooksKey } from "@/constants/query-keys";

export const useDeleteTopic = (notebookId: string, topicId: string) => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => mutateFn(isAuth, notebookId, topicId),
    onSuccess: () => {
      navigate("..", { replace: true });
      queryClient.invalidateQueries(notebooksKey);
    },
  });
};

async function mutateFn(isAuth: boolean, notebookId: string, topicId: string) {
  if (isAuth) {
    return await axios.delete(`notebooks/${notebookId}/topics/${topicId}`);
  }

  return new Promise((res, rej) => {
    try {
      deleteLocalTopic(notebookId, topicId);
      res(true);
    } catch (error) {
      rej(error);
    }
  });
}
