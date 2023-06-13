import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { RequireAtLeastOne, Topic } from "@/types";
import { updateLocalTopic } from "@/utils";
import { notebooksKey } from "@/constants/query-keys";

type UpdateTopic = RequireAtLeastOne<
  Pick<Topic, "name" | "notesRef"> & { noteId: string }
>;

type MutationVariables = {
  notebookId: string;
  topicId: string;
  update: UpdateTopic;
};

export const useUpdateTopic = () => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  return useMutation<Topic, Error, MutationVariables>({
    mutationFn: (d) => mutateFn(isAuth, d.notebookId, d.topicId, d.update),
    onSuccess: () => {
      queryClient.invalidateQueries(notebooksKey);
    },
  });

  async function mutateFn(
    isAuth: boolean,
    notebookId: string,
    topicId: string,
    data: UpdateTopic
  ) {
    if (isAuth) {
      return await axios.put<Topic, Topic>(
        `/notebooks/${notebookId}/topics/${topicId}`,
        data
      );
    }

    return new Promise<Topic>((res, rej) => {
      try {
        const topic = updateLocalTopic(notebookId, topicId, data);
        if (!topic) throw Error("Error creating topic");

        res(topic);
      } catch (error) {
        rej(error);
      }
    });
  }
};
