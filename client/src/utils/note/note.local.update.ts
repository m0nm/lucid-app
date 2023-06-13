import moment from "moment";
import { Note, RequireAtLeastOne } from "@/types";
import { NOTE_STORAGE } from "@/constants/local-events";

type Update = RequireAtLeastOne<Omit<Note, "id" | "updatedAt" | "createdAt">>;

export function updateLocalNote(id: Note["id"], update: Update) {
  const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
  let note = notes.find((note) => note.id === id);

  if (!note) return;

  note = Object.assign(note, update) as Note;

  // update date
  if ("title" in update || "content" in update) {
    note!.updatedAt = moment().format();
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  window.dispatchEvent(new Event(NOTE_STORAGE));
}
