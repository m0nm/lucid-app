import { useGetNotebooks, useGetTags } from "@/hooks";
import { IconType } from "react-icons";
import { ImBooks } from "react-icons/im";

import {
  HiOutlineDocumentText,
  HiOutlineStar,
  HiOutlineClipboardCheck,
  HiOutlineTrash,
  HiOutlineHashtag,
} from "react-icons/hi";

export type ListItemType = {
  label: string;
  link: string;
  icon: IconType;
  state?: Object;
};

// *********************************
// NOTES
// *********************************
const QUICKLINKS: ListItemType[] = [
  { label: "Notes", link: "notes", icon: HiOutlineDocumentText },
  { label: "Favorites", link: "notes/favs", icon: HiOutlineStar },
  { label: "Tasks", link: "tasks", icon: HiOutlineClipboardCheck },
  { label: "Trash", link: "notes/trash", icon: HiOutlineTrash },
];

// *********************************
// NOTEBOOK
// *********************************
const NOTEBOOK: ListItemType = {
  label: "Notebooks",
  link: "notebooks",
  icon: ImBooks,
};

// *********************************
// TAG
// *********************************
const TAG: ListItemType = {
  label: "Tags",
  link: "tags",
  icon: HiOutlineHashtag,
};

// *********************************
// HOOK
// *********************************
export const useGetSidebarContent = () => {
  const tagsList = useGetTags() // get recent tags
    .tags.slice(-2)
    .reverse()
    .map(
      (tag): ListItemType => ({
        label: tag.name,
        link: `tags#${tag.name}`,
        icon: HiOutlineHashtag,
        state: { tag },
      })
    )
    .concat([TAG]);

  const notebooksList = useGetNotebooks() // get recent notebooks
    .notebooks.slice(-2)
    .reverse()
    .map(
      (notebook): ListItemType => ({
        label: notebook.name,
        link: `notebooks/${notebook.id}`,
        icon: ImBooks,
        state: { notebook: { id: notebook.id, name: notebook.name } },
      })
    )
    .concat([NOTEBOOK]);

  return { tagsList, notebooksList, quicklinksList: QUICKLINKS };
};
