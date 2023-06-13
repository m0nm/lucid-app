import { NextFunction, Request, Response } from "express";
import logger from "@/utils/logger";
import { CreateTaskReq, UpdateTaskReq } from "./task.types";

import { getTasks, createTask, updateTask, deleteTask } from "./task.services";

export async function getTasksHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tasks = await getTasks(req.user);
    res.status(200).send(tasks);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function createTaskHandler(
  req: Request<{}, {}, CreateTaskReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const task = await createTask(req.user, req.body);
    res.status(201).send(task);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function updateTaskHandler(
  req: Request<{ id: string }, {}, UpdateTaskReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const task = await updateTask(req.user, req.params.id, req.body);
    res.status(200).send(task);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function deleteTaskHandler(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    await deleteTask(req.user, req.params.id);
    res.sendStatus(204);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}
