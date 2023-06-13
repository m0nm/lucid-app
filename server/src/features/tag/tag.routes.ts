import express from "express";
import validateResource from "@/middleware/validate-resource";
import { TagSchema } from "./tag.schema";

import {
  getTagsHandler,
  getTagNotesHandler,
  createTagHandler,
  updateTagHandler,
  deleteTagHandler,
} from "./tag.controller";

export const router = express.Router();

router.get("/", getTagsHandler);
router.get("/:id/notes", getTagNotesHandler);
router.post("/", validateResource(TagSchema), createTagHandler);
router.put("/:id", validateResource(TagSchema), updateTagHandler);
router.delete("/:id", deleteTagHandler);
