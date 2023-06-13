import { Types } from "mongoose";
import { UserDocument } from "../user";
import { TagInput } from ".";
import throwError from "@/utils/throw-error";

export async function getTags(user: UserDocument | undefined) {
  return user?.tags;
}

export async function getTagNotes(
  user: UserDocument | undefined,
  tagId: string
) {
  const tag = user?.tags.id(tagId);
  if (!tag) throwError(404, "Tag not found");

  const notes = user?.notes.map((n) =>
    n.tagsRef.some((tId) => tId === new Types.ObjectId(tagId))
  );

  return notes;
}

export async function createTag(user: UserDocument | undefined, tag: TagInput) {
  const isExist = user?.tags.findIndex((t) => t.name === tag.name);
  if (isExist && isExist > -1) throwError(400, "Tag already exist");

  user?.tags.push(tag);
  await user?.save();

  return tag;
}

export async function updateTag(
  user: UserDocument | undefined,
  tagId: string,
  updatedTag: TagInput
) {
  const tag = user?.tags.id(tagId);
  if (!tag) return throwError(404, "Tag not found");

  tag?.set(updatedTag);
  await user?.save();

  return tag;
}

export async function deleteTag(user: UserDocument | undefined, tagId: string) {
  const tag = user?.tags.id(tagId);
  if (!tag) return throwError(404, "Tag not found");

  // remove tagId from all tagged notes
  const tagObjectId = new Types.ObjectId(tagId);

  user?.notes.forEach((n) => {
    n.tagsRef = n.tagsRef.filter(
      (tId) => tId.toString() !== tagObjectId.toString()
    );
  });

  await tag?.remove();
  await user?.save();
  return true;
}
