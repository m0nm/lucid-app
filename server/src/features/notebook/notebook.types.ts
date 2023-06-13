import { TypeOf } from "zod";
import { Types } from "mongoose";

import {
  CreateNotebookSchema,
  TopicSchema,
  UpdateNotebookSchema,
} from "./notebook.schema";

export type NotebookInput = {
  name: string;
  topics: Topic[];
};

export type NotebookDocument = {
  name: string;
  topics: Types.DocumentArray<TopicDocument>;
  createdAt: Date;
  updatedAt: Date;
};

export type Topic = TypeOf<typeof TopicSchema>;
export type TopicDocument = Topic & { createdAt: Date; updatedAt: Date };
export type UpdateTopicReq = Omit<Topic, "kind"> & { noteId: string };

export type CreateNotebookReq = TypeOf<typeof CreateNotebookSchema>;
export type UpdateNotebookReq = TypeOf<typeof UpdateNotebookSchema>;
