import { Types } from "mongoose";
import { z } from "zod";

export const NoteSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "note title is required" }),
    content: z.string().default(""),
    isFavorite: z.boolean().default(false),
    isTrash: z.boolean().default(false),
    tagsRef: z.array(z.instanceof(Types.ObjectId)).default([]),
  }),
});

export const UpdateNoteScheme = z.object({
  body: NoteSchema.shape.body.extend({
    title: z.string().optional(),
  }),
});
