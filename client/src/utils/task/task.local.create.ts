import moment from "moment";
import { Task } from "@/types";
import { v4 as uuid } from "uuid";
import { TASK_STORAGE } from "@/constants/local-events";

export const createLocalTask = (
  title: Task["title"],
  desc: Task["description"],
  priority: Task["priority"]
) => {
  const task: Task = {
    id: uuid(),
    createdAt: moment().format(),
    updatedAt: moment().format(),
    description: desc,
    title,
    priority,
  };

  const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  window.dispatchEvent(new Event(TASK_STORAGE));

  return task;
};
