import { Notebook } from "@/types";
import { updateLocalNote } from "@/utils";
import { NOTEBOOK_STORAGE } from "@/constants/local-events";

export function deleteLocalNotebook(notebookId: Notebook["id"]) {
  let notebooks: Notebook[] = JSON.parse(
    localStorage.getItem("notebooks") as string
  );
  const notebook = notebooks.find((n) => n.id === notebookId);

  // move all topic's notes to trash
  notebook!.topics.forEach((t) =>
    t.notesRef.forEach((nId) => updateLocalNote(nId, { isTrash: true }))
  );

  notebooks = notebooks.filter((n) => n.id !== notebookId);

  localStorage.setItem("notebooks", JSON.stringify(notebooks));
  window.dispatchEvent(new Event(NOTEBOOK_STORAGE));
}
