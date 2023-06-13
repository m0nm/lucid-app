import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { useIsAuth } from "@/lib/auth";
import { deleteLocalTask } from "@/utils";
import { tasksKey } from "@/constants/query-keys";

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  const { mutate } = useMutation({
    mutationFn: async () => await axios.delete(`tasks/${taskId}`),
    onSuccess: () => {
      if (isAuth) queryClient.invalidateQueries(tasksKey);
    },
  });

  const onDeleteTask = () => {
    if (isAuth) {
      mutate();
      return;
    }

    deleteLocalTask(taskId);
  };

  return { onDeleteTask };
};
