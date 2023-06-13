import express from "express";
import validateResource from "@/middleware/validate-resource";
import { CreateTaskSchema, UpdateTaskSchema } from "./task.schema";

import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "./task.controller";

export const router = express.Router();

router.get("/", getTasksHandler);
router.post("/", validateResource(CreateTaskSchema), createTaskHandler);
router.put("/:id", validateResource(UpdateTaskSchema), updateTaskHandler);
router.delete("/:id", deleteTaskHandler);
