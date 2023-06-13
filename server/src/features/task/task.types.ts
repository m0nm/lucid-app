import { Document } from "mongoose";
import { TypeOf } from "zod";
import { CreateTaskSchema, UpdateTaskSchema } from "./task.schema";

export type TaskInput = {
  title: string;
  description?: string;
  priority: "high" | "moderate" | "low" | "non-essential";
};

export type TaskDocument = TaskInput &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

export type CreateTaskReq = TypeOf<typeof CreateTaskSchema>;
export type UpdateTaskReq = TypeOf<typeof UpdateTaskSchema>;
