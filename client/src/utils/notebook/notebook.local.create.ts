import moment from "moment";
import { v4 as uuid } from "uuid";
import { Notebook, Topic } from "@/types";
import { NOTEBOOK_STORAGE } from "@/constants/local-events";

export const createLocalNotebook = (notebookName: string, topics?: Topic[]) => {
  const notebook: Notebook = {
    id: uuid(),
    name: notebookName,
    topics: topics || [],
    createdAt: moment().format(),
    updatedAt: moment().format(),
  };

  const notebooks: Notebook[] = JSON.parse(
    localStorage.getItem("notebooks") || "[]"
  );

  notebooks.push(notebook);

  localStorage.setItem("notebooks", JSON.stringify(notebooks));
  window.dispatchEvent(new Event(NOTEBOOK_STORAGE));

  return notebook;
};
