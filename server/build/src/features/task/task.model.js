"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = void 0;
const mongoose_1 = require("mongoose");
const schema = {
    title: { required: true, type: String },
    description: String,
    priority: {
        required: true,
        type: String,
        enum: ["high", "moderate", "low", "non-essential"],
    },
};
const options = { timestamps: true };
exports.TaskSchema = new mongoose_1.Schema(schema, options);
