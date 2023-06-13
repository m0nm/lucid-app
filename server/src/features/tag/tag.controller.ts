import { NextFunction, Request, Response } from "express";
import logger from "@/utils/logger";
import { CreateTagReq, UpdateTagReq } from ".";

import {
  getTagNotes,
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from "./tag.services";

export async function getTagsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tags = await getTags(req.user);
    res.status(200).send(tags);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}
export async function getTagNotesHandler(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const notes = await getTagNotes(req.user, req.params.id);
    res.status(200).send(notes);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function createTagHandler(
  req: Request<{}, {}, CreateTagReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const tag = await createTag(req.user, req.body);
    res.status(201).send(tag);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function updateTagHandler(
  req: Request<{ id: string }, {}, UpdateTagReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const tag = await updateTag(req.user, req.params.id, req.body);
    res.status(200).send(tag);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function deleteTagHandler(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    await deleteTag(req.user, req.params.id);
    res.sendStatus(204);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}
