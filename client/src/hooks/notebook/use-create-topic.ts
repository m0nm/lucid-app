import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { Topic } from "@/types";
import { createLocalTopic } from "@/utils";
import { notebooksKey } from "@/constants/query-keys";

type CreateTopic = { notebookId: string; topicName: string };

export const useCreateTopic = () => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  return useMutation<Topic, Error, CreateTopic>({
    mutationFn: (data) => mutateFn(isAuth, data),
    onSuccess: () => {
      if (isAuth) queryClient.invalidateQueries(notebooksKey);
    },
  });
};

async function mutateFn(isAuth: boolean, data: CreateTopic) {
  if (isAuth)
    return await axios.post<Topic, Topic>(
      `notebooks/${data.notebookId}/topics`,
      {
        name: data.topicName,
      }
    );

  return new Promise<Topic>((res, rej) => {
    try {
      const topic = createLocalTopic(data.notebookId, data.topicName);
      res(topic as Topic);
    } catch (error) {
      rej(error);
    }
  });
}
