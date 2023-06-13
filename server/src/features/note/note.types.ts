import { Types } from "mongoose";
import { TypeOf } from "zod";
import { NoteSchema } from "./note.schema";

export type NoteInput = {
  title: string;
  content: string;
  isFavorite: boolean;
  isTrash: boolean;

  tagsRef: Types.ObjectId[];
};

export type NoteDocument = NoteInput & {
  createdAt: Date;
  updatedAt: Date;
};

export type CreateNoteReq = TypeOf<typeof NoteSchema>;
export type UpdateNoteReq = TypeOf<typeof NoteSchema>;
