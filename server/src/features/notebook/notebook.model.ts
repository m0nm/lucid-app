import { Schema } from "mongoose";
import { NotebookDocument, Topic } from "./notebook.types";

const TopicSchema = new Schema<Topic>(
  {
    name: String,
    notesRef: [],
    kind: {type: String, default: "Topic"} // to differntiate from Tag in client
  },
  { timestamps: true }
);

export const NotebookSchema = new Schema<NotebookDocument>(
  {
    name: String,
    topics: [TopicSchema],
  },
  { timestamps: true }
);
