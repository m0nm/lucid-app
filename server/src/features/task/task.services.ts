import { UserDocument } from "../user";
import { TaskInput } from ".";
import throwError from "@/utils/throw-error";

export async function getTasks(user: UserDocument | undefined) {
  return user?.tasks;
}

export async function createTask(
  user: UserDocument | undefined,
  task: TaskInput
) {
  user?.tasks.push(task);
  await user?.save();

  return task;
}

export async function updateTask(
  user: UserDocument | undefined,
  taskId: string,
  updatedtask: Partial<TaskInput>
) {
  const task = user?.tasks.id(taskId);
  if (!task) return throwError(404, "task not found");

  task?.set(updatedtask);
  await user?.save();

  return task;
}

export async function deleteTask(
  user: UserDocument | undefined,
  taskId: string
) {
  const task = user?.tasks.id(taskId);
  if (!task) return throwError(404, "task not found");

  await task?.remove();
  await user?.save();
  return true;
}
