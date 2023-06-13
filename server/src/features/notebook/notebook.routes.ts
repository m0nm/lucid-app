import express from "express";
import validateResource from "@/middleware/validate-resource";

import {
  CreateNotebookSchema,
  CreateTopicSchema,
  UpdateNotebookSchema,
  UpdateTopicSchema,
} from "./notebook.schema";

import {
  createNotebookHandler,
  createTopicHandler,
  deleteNotebookHandler,
  getNotebooksHandler,
  updateNotebookHandler,
  updateTopicHandler,
  deleteTopicHandler,
} from "./notebook.controller";

export const router = express.Router();

router.get("/", getNotebooksHandler);

router.post("/", validateResource(CreateNotebookSchema), createNotebookHandler);
router.post(
  "/:notebookId/topics",
  validateResource(CreateTopicSchema),
  createTopicHandler
);

router.put(
  "/:id",
  validateResource(UpdateNotebookSchema),
  updateNotebookHandler
);
router.put(
  "/:notebookId/topics/:topicId",
  validateResource(UpdateTopicSchema),
  updateTopicHandler
);

router.delete("/:id", deleteNotebookHandler);
router.delete("/:notebookId/topics/:topicId", deleteTopicHandler);
