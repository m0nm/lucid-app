import { Note, Tag } from "@/types";
import { NOTE_STORAGE } from "@/constants/local-events";

export const createLocalNote = (initialNote: Note): Note => {
  const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push(initialNote);

  localStorage.setItem("notes", JSON.stringify(notes));
  window.dispatchEvent(new Event(NOTE_STORAGE));

  return initialNote;
};
