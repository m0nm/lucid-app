import express from "express";
import validateResource from "@/middleware/validate-resource";
import { NoteSchema, UpdateNoteScheme } from "./note.schema";

import {
  getNotesHandler,
  getNoteTagsHandler,
  createNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
  deleteTrashHandler,
} from "./note.controller";

export const router = express.Router();

router.get("/", getNotesHandler);
router.get("/:id", getNoteTagsHandler);
router.post("/", validateResource(NoteSchema), createNoteHandler);
router.put("/:id", validateResource(UpdateNoteScheme), updateNoteHandler);
router.delete("/delete-trash", deleteTrashHandler);
router.delete("/:id", deleteNoteHandler);
