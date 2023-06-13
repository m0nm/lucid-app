import { Tag } from ".";

export type Note = {
  readonly id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tagsRef: Tag["id"][];
  isFavorite: boolean;
  isTrash: boolean;
};

export type NotesType = "favs" | "trash" | "notes";
