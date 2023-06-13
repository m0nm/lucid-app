import { Note, Tag } from "@/types";
import { NOTE_STORAGE } from "@/constants/local-events";

export const getLocalTagNotes = (tagId: Tag["id"]) => {
  function fetch() {
    const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");

    const tagNotes = notes.filter(
      (note) => !note.isTrash && note.tagsRef?.some((nt) => nt === tagId)
    );

    return tagNotes;
  }

  window.addEventListener(NOTE_STORAGE, fetch);

  return fetch();
};
