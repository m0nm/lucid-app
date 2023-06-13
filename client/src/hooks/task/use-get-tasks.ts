import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";

import { Task } from "@/types";
import { tasksKey } from "@/constants/query-keys";
import { TASK_STORAGE } from "@/constants/local-events";

export const useGetTasks = () => {
  const isAuth = useIsAuth();

  const tasksQuery = useQuery({
    queryKey: tasksKey,
    queryFn: () => fetchTasks(isAuth),
  });

  useEffect(() => {
    if (isAuth) return;

    function refetchGuestTasks() {
      tasksQuery.refetch();
    }

    window.addEventListener(TASK_STORAGE, refetchGuestTasks);
    return () => {
      window.removeEventListener(TASK_STORAGE, refetchGuestTasks);
    };
  }, []);

  return tasksQuery;
};

function fetchTasks(isAuth: boolean): Promise<Task[]> {
  if (isAuth) return fetchUserTasks();
  return fetchGuestTasks();
}

function fetchGuestTasks() {
  return new Promise<Task[]>((res, rej) => {
    try {
      const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
      res(tasks);
    } catch (e) {
      rej(e);
    }
  });
}

async function fetchUserTasks() {
  return await axios.get<Task[], Task[]>("/tasks");
}
