import { Tag } from "@/types";

export const getLocalTag = (tagId: Tag["id"]) => {
  const tags: Tag[] = JSON.parse(localStorage.getItem("tags") || "[]");
  const tag = tags.find((item) => item.id === tagId);

  if (tag) return tag;
};
