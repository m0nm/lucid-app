import { Notebook } from "@/types";
import { updateLocalNote } from "..";
import { NOTEBOOK_STORAGE } from "@/constants/local-events";

export const deleteLocalTopic = (notebookId: string, topicId: string) => {
  let notebooks: Notebook[] = JSON.parse(
    localStorage.getItem("notebooks") as string
  );
  const notebook = notebooks.find((n) => n.id === notebookId);

  // delete topic
  const topic = notebook!.topics.find((t) => t.id === topicId);

  // move all topic's notes to trash
  topic?.notesRef.forEach((nId) => updateLocalNote(nId, { isTrash: true }));

  const newTopics = notebook!.topics.filter((t) => t.id !== topicId);
  notebook!.topics = newTopics;

  localStorage.setItem("notebooks", JSON.stringify(notebooks));
  window.dispatchEvent(new Event(NOTEBOOK_STORAGE));
};
