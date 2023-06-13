"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const validate_resource_1 = __importDefault(require("../../middleware/validate-resource"));
const note_schema_1 = require("./note.schema");
const note_controller_1 = require("./note.controller");
exports.router = express_1.default.Router();
exports.router.get("/", note_controller_1.getNotesHandler);
exports.router.get("/:id", note_controller_1.getNoteTagsHandler);
exports.router.post("/", (0, validate_resource_1.default)(note_schema_1.NoteSchema), note_controller_1.createNoteHandler);
exports.router.put("/:id", (0, validate_resource_1.default)(note_schema_1.UpdateNoteScheme), note_controller_1.updateNoteHandler);
exports.router.delete("/delete-trash", note_controller_1.deleteTrashHandler);
exports.router.delete("/:id", note_controller_1.deleteNoteHandler);
