import { NextFunction, Request, Response } from "express";
import logger from "@/utils/logger";
import { CreateNoteReq, UpdateNoteReq } from ".";

import {
  createNote,
  deleteNote,
  deleteTrash,
  getNotes,
  getNoteTags,
  updateNote,
} from "./note.services";

export async function getNotesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notes = await getNotes(req.user);
    res.status(200).send(notes);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}
export async function getNoteTagsHandler(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const tags = await getNoteTags(req.user, req.params.id);
    res.status(200).send(tags);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function createNoteHandler(
  req: Request<{}, {}, CreateNoteReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const note = await createNote(req.user, req.body);
    res.status(201).send(note);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

export async function updateNoteHandler(
  req: Request<{ id: string }, {}, UpdateNoteReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const note = await updateNote(req.user, req.params.id, req.body);
    res.status(200).send(note);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}
export async function deleteNoteHandler(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    await deleteNote(req.user, req.params.id);
    res.sendStatus(204);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}
export async function deleteTrashHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await deleteTrash(req.user);
    res.sendStatus(204);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}
