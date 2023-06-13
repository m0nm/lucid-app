"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTopicSchema = exports.UpdateNotebookSchema = exports.CreateTopicSchema = exports.CreateNotebookSchema = exports.TopicSchema = void 0;
const zod_1 = require("zod");
exports.TopicSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Topic name is required" }),
    notesRef: zod_1.z.array(zod_1.z.string()).default([]),
    kind: zod_1.z.string().default("Topic"),
});
const NotebookSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Notebook name is required" }),
    topics: zod_1.z.array(exports.TopicSchema).default([]),
});
exports.CreateNotebookSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Notebook name is required" }),
        topics: zod_1.z.array(exports.TopicSchema).default([]),
    }),
});
exports.CreateTopicSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Topic name is required" }),
        notesRef: zod_1.z.array(zod_1.z.string()).default([]),
    }),
});
exports.UpdateNotebookSchema = zod_1.z.object({
    body: NotebookSchema.extend({})
        .partial()
        .refine(({ name, topics }) => name !== undefined || topics !== undefined, {
        message: "Require at least one field to update",
    }),
});
exports.UpdateTopicSchema = zod_1.z.object({
    body: exports.TopicSchema.extend({})
        .omit({ kind: true })
        .partial()
        .refine(({ name, notesRef }) => name !== undefined || notesRef !== undefined, {
        message: "Require at least one field to update",
    }),
});
