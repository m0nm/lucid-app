"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookSchema = void 0;
const mongoose_1 = require("mongoose");
const TopicSchema = new mongoose_1.Schema({
    name: String,
    notesRef: [],
    kind: { type: String, default: "Topic" } // to differntiate from Tag in client
}, { timestamps: true });
exports.NotebookSchema = new mongoose_1.Schema({
    name: String,
    topics: [TopicSchema],
}, { timestamps: true });
