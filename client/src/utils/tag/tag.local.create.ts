import moment from "moment";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { Tag } from "@/types";
import { TAG_STORAGE } from "@/constants/local-events";

export const createLocalTag = (tagName: string) => {
  const tag: Tag = {
    id: uuid(),
    kind: "Tag" as "Tag",
    name: tagName,
    createdAt: moment().format(),
    updatedAt: moment().format(),
  };

  const tags: Tag[] = JSON.parse(localStorage.getItem("tags") || "[]");

  // check if tag already exist
  if (checkTagExist(tags, tagName)) return;

  // else add it
  tags.push(tag);
  localStorage.setItem("tags", JSON.stringify(tags));
  window.dispatchEvent(new Event(TAG_STORAGE));

  return tag;
};

function checkTagExist(tags: Tag[], tagName: string) {
  const isFound = tags.findIndex(
    (t) => t.name.toLowerCase() == tagName.toLowerCase()
  );

  if (isFound !== -1) {
    toast.error("a tag with this name already exists", {
      id: "tag-exist-toast",
    });

    return true;
  }

  return false;
}
