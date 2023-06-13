import { z } from "zod";

export const TopicSchema = z.object({
  name: z.string({ required_error: "Topic name is required" }),
  notesRef: z.array(z.string()).default([]),
  kind: z.string().default("Topic"),
});

const NotebookSchema = z.object({
  name: z.string({ required_error: "Notebook name is required" }),
  topics: z.array(TopicSchema).default([]),
});

export const CreateNotebookSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Notebook name is required" }),
    topics: z.array(TopicSchema).default([]),
  }),
});

export const CreateTopicSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Topic name is required" }),
    notesRef: z.array(z.string()).default([]),
  }),
});

export const UpdateNotebookSchema = z.object({
  body: NotebookSchema.extend({})
    .partial()
    .refine(({ name, topics }) => name !== undefined || topics !== undefined, {
      message: "Require at least one field to update",
    }),
});

export const UpdateTopicSchema = z.object({
  body: TopicSchema.extend({})
    .omit({ kind: true })
    .partial()
    .refine(
      ({ name, notesRef }) => name !== undefined || notesRef !== undefined,
      {
        message: "Require at least one field to update",
      }
    ),
});
