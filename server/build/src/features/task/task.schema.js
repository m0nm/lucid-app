"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskSchema = exports.CreateTaskSchema = exports.TaskSchema = void 0;
const zod_1 = require("zod");
exports.TaskSchema = zod_1.z.object({
    title: zod_1.z.string({ required_error: "task title is required" }),
    description: zod_1.z.string().optional(),
    priority: zod_1.z.enum(["high", "moderate", "low", "non-essential"], {
        required_error: "task priority is required",
    }),
});
exports.CreateTaskSchema = zod_1.z.object({ body: exports.TaskSchema.extend({}) });
exports.UpdateTaskSchema = zod_1.z.object({
    body: exports.TaskSchema.extend({})
        .partial()
        .refine(({ title, description, priority }) => title !== undefined ||
        description !== undefined ||
        priority !== undefined, { message: "Require at least one field to update" }),
});
