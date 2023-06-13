import { NOTE_STORAGE } from "@/constants/local-events";
import { Note } from "@/types";

export function deleteLocalTrash(noteId?: string): void {
  const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");

  // delete one specified trash note
  if (typeof noteId == "string") {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes.filter((item) => item.id !== noteId))
    );
  }

  // delete all trash notes
  else {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes.filter((item) => !item.isTrash))
    );
  }

  window.dispatchEvent(new Event(NOTE_STORAGE));
}
