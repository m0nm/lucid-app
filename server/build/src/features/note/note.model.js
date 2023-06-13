"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = void 0;
const mongoose_encryption_1 = __importDefault(require("mongoose-encryption"));
const mongoose_1 = require("mongoose");
exports.NoteSchema = new mongoose_1.Schema({
    title: { required: true, type: String },
    content: { default: "", type: String },
    isFavorite: { default: false, type: Boolean },
    isTrash: { default: false, type: Boolean },
    tagsRef: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Tag" }],
}, { timestamps: true });
const encKey = process.env.MONGOOSE_ENC_KEY;
const signKey = process.env.MONGOOSE_SIGN_KEY;
// encrypt note
exports.NoteSchema.plugin(mongoose_encryption_1.default, {
    encryptionKey: encKey,
    signingKey: signKey,
    decryptPostSave: false,
});
