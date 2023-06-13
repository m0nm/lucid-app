import { Notebook } from "@/types";

export function updateLocalNotebook(
  notebookId: Notebook["id"],
  newName: string
) {
  const notebooks: Notebook[] = JSON.parse(
    localStorage.getItem("notebooks") as string
  );
  const notebook = notebooks.find((n) => n.id === notebookId);

  notebook!.name = newName;

  localStorage.setItem("notebooks", JSON.stringify(notebooks));
  window.dispatchEvent(new Event("storage"));

  return notebook;
}
