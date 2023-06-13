"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagSchema = void 0;
const zod_1 = require("zod");
exports.TagSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "tag name is required" }),
    }),
});
