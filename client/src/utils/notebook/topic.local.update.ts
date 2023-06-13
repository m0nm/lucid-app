import { NOTEBOOK_STORAGE } from "@/constants/local-events";
import { Notebook, RequireAtLeastOne, Topic } from "@/types";

type Update = RequireAtLeastOne<
  Pick<Topic, "name" | "notesRef"> & { noteId: string }
>;

export function updateLocalTopic(
  notebookId: Notebook["id"],
  topicId: Topic["id"],
  update: Update
) {
  const notebooks: Notebook[] = JSON.parse(
    localStorage.getItem("notebooks") || "[]"
  );

  const notebook = notebooks.find((n) => n.id == notebookId);

  let topic = notebook!.topics.find((t) => t.id == topicId);
  if (!topic) return;

  if ("noteId" in update && typeof update.noteId == "string") {
    // if note already assigned to topic
    if (topic?.notesRef.includes(update.noteId)) return;

    topic?.notesRef.push(update.noteId);
  }

  // change name or notesref
  else {
    topic = Object.assign(topic, update) as Topic;
  }

  localStorage.setItem("notebooks", JSON.stringify(notebooks));
  window.dispatchEvent(new Event(NOTEBOOK_STORAGE));
  return topic;
}
