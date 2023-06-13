import { Schema, SchemaDefinition } from "mongoose";
import { TaskDocument, TaskInput } from "./task.types";

const schema: SchemaDefinition<TaskInput> = {
  title: { required: true, type: String },
  description: String,
  priority: {
    required: true,
    type: String,
    enum: ["high", "moderate", "low", "non-essential"],
  },
};

const options = { timestamps: true };

export const TaskSchema = new Schema<TaskDocument>(schema, options);
