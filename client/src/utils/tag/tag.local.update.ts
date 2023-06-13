import { TAG_STORAGE } from "@/constants/local-events";
import { Tag } from "@/types";

// update tag name
export function updateLocalTag(tagId: Tag["id"], newName: string) {
  const tags: Tag[] = JSON.parse(localStorage.getItem("tags") || "[]");

  const tag = tags.find((t) => t.id === tagId);
  if (!tag) return;

  tag.name = newName;

  localStorage.setItem("tags", JSON.stringify(tags));
  window.dispatchEvent(new Event(TAG_STORAGE));

  return tag;
}

// update whole tags
export function updateLocalTags(newTags: Tag[]) {
  localStorage.setItem("tags", JSON.stringify(newTags));
  window.dispatchEvent(new Event(TAG_STORAGE));

  const tags: Tag[] = JSON.parse(localStorage.getItem("tags") || "[]");
  return tags;
}
