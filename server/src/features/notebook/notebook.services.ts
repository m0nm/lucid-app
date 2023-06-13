import { User, UserDocument } from "../user";
import { NotebookInput, UpdateTopicReq } from ".";
import throwError from "@/utils/throw-error";

export async function getNotebooks(user: UserDocument | undefined) {
  return user?.notebooks;
}

export async function createNotebook(
  user: UserDocument | undefined,
  notebook: NotebookInput
) {
  user?.notebooks.push(notebook);
  await user?.save();

  return notebook;
}

export async function createTopic(
  user: UserDocument | undefined,
  notebookId: string,
  name: string
) {
  const notebook = user?.notebooks.id(notebookId);
  if (!notebook) return throwError(404, "Notebook not found");

  notebook?.topics.push({ name });
  await user?.save();

  return name;
}

export async function updateNotebook(
  user: UserDocument | undefined,
  notebookId: string,
  updatedNotebook: Partial<NotebookInput>
) {
  const notebook = user?.notebooks.id(notebookId);
  if (!notebook) return throwError(404, "Notebook not found");

  notebook?.set(updatedNotebook);
  await user?.save();

  return notebook;
}

export async function updateTopic(
  user: UserDocument | undefined,
  notebookId: string,
  topicId: string,
  updatedTopic: UpdateTopicReq
) {
  const notebook = user?.notebooks.id(notebookId);
  if (!notebook) return throwError(404, "Notebook not found");

  let topic = notebook.topics.id(topicId);
  if (!topic) return throwError(404, "Topic not found");

  const { noteId, name, notesRef } = updatedTopic;

  if (name) {
    topic.name = name;
  }

  if (notesRef) {
    topic.notesRef = notesRef;
  }

  if (noteId && !topic.notesRef.includes(noteId)) {
    topic.notesRef.push(noteId);
  }

  await user?.save();
  return topic;
}

export async function deleteNotebook(
  user: UserDocument | undefined,
  notebookId: string
) {
  const notebook = user?.notebooks.id(notebookId);
  if (!notebook) return throwError(404, "Notebook not found");

  notebook.topics.forEach((topic) => {
    topic.notesRef.forEach((nId) => {
      const note = user?.notes.id(nId);

      if (note) {
        note.isTrash = true;
        note.isFavorite = false;
      }
    });
  });

  await notebook?.remove();
  await user?.save();

  return true;
}

export async function deleteTopic(
  user: UserDocument | undefined,
  notebookId: string,
  topicId: string
) {
  const notebook = user?.notebooks.id(notebookId);
  if (!notebook) return throwError(404, "Notebook not found");

  const topic = notebook.topics.id(topicId);
  if (!topic) return throwError(404, "Topic not found");

  topic.notesRef.forEach((nId) => {
    const note = user?.notes.id(nId);

    if (note) {
      note.isTrash = true;
      note.isFavorite = false;
    }
  });

  await topic?.remove();
  await user?.save();

  return true;
}
