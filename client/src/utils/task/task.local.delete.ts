import { Task } from "@/types";
import { TASK_STORAGE } from "@/constants/local-events";

export const deleteLocalTask = (taskId: Task["id"]) => {
  const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  const newTasks = tasks.filter((item) => item.id !== taskId);

  localStorage.setItem("tasks", JSON.stringify(newTasks));
  window.dispatchEvent(new Event(TASK_STORAGE));
};
