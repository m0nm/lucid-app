import { NextFunction, Request, Response } from "express";
import logger from "@/utils/logger";

import { CreateNotebookReq, UpdateNotebookReq, UpdateTopicReq } from ".";
import {
  createNotebook,
  deleteNotebook,
  getNotebooks,
  updateNotebook,
  createTopic,
  updateTopic,
  deleteTopic,
} from "./notebook.services";

export async function getNotebooksHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notebooks = await getNotebooks(req.user);
    res.status(200).send(notebooks);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function createNotebookHandler(
  req: Request<{}, {}, CreateNotebookReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const notebook = await createNotebook(req.user, req.body);

    res
      .status(201)
      .send({ notebook, message: "Notebook created successfully" });
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function createTopicHandler(
  req: Request<{ notebookId: string }, {}, { name: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const topic = await createTopic(
      req.user,
      req.params.notebookId,
      req.body.name
    );
    res.status(201).send({ topic, message: "Topic created successfully" });
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function updateNotebookHandler(
  req: Request<{ id: string }, {}, UpdateNotebookReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const notebook = await updateNotebook(req.user, req.params.id, req.body);
    res.status(200).send(notebook);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}
export async function updateTopicHandler(
  req: Request<{ notebookId: string; topicId: string }, {}, UpdateTopicReq>,
  res: Response,
  next: NextFunction
) {
  try {
    const { notebookId, topicId } = req.params;

    const topic = await updateTopic(req.user, notebookId, topicId, req.body);

    res.status(200).send(topic);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function deleteNotebookHandler(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    await deleteNotebook(req.user, req.params.id);
    res.sendStatus(204);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function deleteTopicHandler(
  req: Request<{ notebookId: string; topicId: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { notebookId, topicId } = req.params;

    await deleteTopic(req.user, notebookId, topicId);
    res.sendStatus(204);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}
