import { Note } from ".";

export type Notebook = {
  readonly id: string;
  name: string;
  topics: Topic[];
  createdAt: string;
  updatedAt: string;
};

export type Topic = {
  readonly kind: "Topic"; // to differntiate from Tag

  readonly id: string;
  name: string;
  notesRef: Note["id"][];
  createdAt: string;
  updatedAt: string;
};
