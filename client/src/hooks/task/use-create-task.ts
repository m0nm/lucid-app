import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { Task } from "@/types";
import { createLocalTask } from "@/utils";
import { tasksKey } from "@/constants/query-keys";

type CreateTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  return useMutation<Task, Error, CreateTask>({
    mutationFn: (data) => mutateFn(isAuth, data),
    onSuccess: () => {
      if (isAuth) queryClient.invalidateQueries(tasksKey);
    },
  });
};

async function mutateFn(isAuth: boolean, data: CreateTask) {
  if (isAuth) return await axios.post<Task, Task>("/tasks", data);

  return new Promise<Task>((res, rej) => {
    try {
      const task = createLocalTask(data.title, data.description, data.priority);
      res(task as Task);
    } catch (error) {
      rej(error);
    }
  });
}
