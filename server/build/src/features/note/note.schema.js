"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteScheme = exports.NoteSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.NoteSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "note title is required" }),
        content: zod_1.z.string().default(""),
        isFavorite: zod_1.z.boolean().default(false),
        isTrash: zod_1.z.boolean().default(false),
        tagsRef: zod_1.z.array(zod_1.z.instanceof(mongoose_1.Types.ObjectId)).default([]),
    }),
});
exports.UpdateNoteScheme = zod_1.z.object({
    body: exports.NoteSchema.shape.body.extend({
        title: zod_1.z.string().optional(),
    }),
});
