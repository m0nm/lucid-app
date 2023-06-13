import { UserDocument } from "../user";
import { NoteDocument, NoteInput } from ".";
import throwError from "@/utils/throw-error";
import { Types } from "mongoose";

export async function getNotes(user: UserDocument | undefined) {
  return user?.notes;
}
export async function getNoteTags(
  user: UserDocument | undefined,
  noteId: string
) {
  const note = user?.notes.id(noteId);
  if (!note) return throwError(404, "Note not found");

  const tags = note.tagsRef.map((tId) => user?.tags.id(tId));
  return tags;
}

export async function createNote(
  user: UserDocument | undefined,
  noteInput: NoteInput
) {
  const note = user?.notes.create(noteInput);
  user?.notes.push(note as NoteDocument);
  await user?.save();

  return note;
}

export async function updateNote(
  user: UserDocument | undefined,
  noteId: string,
  updatedNote: NoteInput
) {
  const note = user?.notes.id(noteId);
  if (!note) return throwError(404, "Note not found");

  note?.set(updatedNote);
  await user?.save();

  return note;
}

export async function deleteNote(
  user: UserDocument | undefined,
  noteId: string
) {
  const note = user?.notes.id(noteId);
  if (!note) return throwError(404, "Note not found");

  await note?.remove();
  await user?.save();

  return true;
}

export async function deleteTrash(user: UserDocument | undefined) {
  const notes = user?.notes.filter((note) => !note.isTrash);

  user!.notes = notes as Types.DocumentArray<NoteDocument>;
  await user?.save();

  return true;
}
