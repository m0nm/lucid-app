import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string({ required_error: "task title is required" }),
  description: z.string().optional(),
  priority: z.enum(["high", "moderate", "low", "non-essential"], {
    required_error: "task priority is required",
  }),
});

export const CreateTaskSchema = z.object({ body: TaskSchema.extend({}) });

export const UpdateTaskSchema = z.object({
  body: TaskSchema.extend({})
    .partial()
    .refine(
      ({ title, description, priority }) =>
        title !== undefined ||
        description !== undefined ||
        priority !== undefined,
      { message: "Require at least one field to update" }
    ),
});
