import { Note, Tag } from "@/types";
import { TAG_STORAGE } from "@/constants/local-events";

export const deleteLocalTag = (tagId: Tag["id"]) => {
  const tags: Tag[] = JSON.parse(localStorage.getItem("tags") || "[]");
  const newTags = tags.filter((item) => item.id !== tagId);

  // remove tag ref from all associated notes
  const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.forEach((note) => {
    note.tagsRef = note.tagsRef.filter((tId) => tId !== tagId);
  });

  localStorage.setItem("tags", JSON.stringify(newTags));
  localStorage.setItem("notes", JSON.stringify(notes));
  window.dispatchEvent(new Event(TAG_STORAGE));
};
