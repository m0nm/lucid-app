import noNotes from "@/assets/app/no-notes.png";
import noFavs from "@/assets/app/no-favs.png";
import noTrash from "@/assets/app/no-trash.png";
import noTags from "@/assets/app/no-tags.png";
import noNotebooks from "@/assets/app/no-notebooks.png";
import noTopics from "@/assets/app/no-topics.png";
import noSearch from "@/assets/app/no-results.png";
import noTasks from "@/assets/app/no-tasks.png";

export type PlaceholderKeys =
  | "notes"
  | "favs"
  | "trash"
  | "tags"
  | "tag-notes"
  | "notebooks"
  | "topics"
  | "topic-notes"
  | "search"
  | "tasks";

type PlaceholderValue = {
  image: string;
  text: string;
  width?: number;
  height?: number;
};

const placeholderContent: Record<PlaceholderKeys, PlaceholderValue> = {
  notes: {
    image: noNotes,
    text: "you have not created any notes yet",
  },

  favs: {
    image: noFavs,
    text: "no favorites yet",
  },

  trash: {
    image: noTrash,
    text: "trash is empty",
  },

  tags: {
    image: noTags,
    text: "you have not created any tags yet",
  },

  "tag-notes": {
    image: noTags,
    text: "no notes assigned to this tag yet",
  },

  notebooks: {
    image: noNotebooks,
    text: "you have not created any notebooks yet",
  },

  topics: {
    image: noTopics,
    text: "you have not created any topics yet",
  },

  "topic-notes": {
    image: noTopics,
    text: "you have not assigned any notes to this topic yet",
  },

  search: {
    image: noSearch,
    text: "no results found",
  },

  tasks: {
    image: noTasks,
    text: "No tasks have been created yet",
  },
};

export const getPlaceholder = (key: PlaceholderKeys) => {
  return placeholderContent[key];
};
