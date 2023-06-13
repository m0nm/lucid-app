"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagSchema = void 0;
const mongoose_1 = require("mongoose");
const schema = {
    name: { required: true, type: String },
    kind: { type: String, default: "Tag" }, // to differntiate from Topic in client,
};
const options = { timestamps: true };
exports.TagSchema = new mongoose_1.Schema(schema, options);
