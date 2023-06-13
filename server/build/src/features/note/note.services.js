"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrash = exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteTags = exports.getNotes = void 0;
const throw_error_1 = __importDefault(require("../../utils/throw-error"));
function getNotes(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return user === null || user === void 0 ? void 0 : user.notes;
    });
}
exports.getNotes = getNotes;
function getNoteTags(user, noteId) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = user === null || user === void 0 ? void 0 : user.notes.id(noteId);
        if (!note)
            return (0, throw_error_1.default)(404, "Note not found");
        const tags = note.tagsRef.map((tId) => user === null || user === void 0 ? void 0 : user.tags.id(tId));
        return tags;
    });
}
exports.getNoteTags = getNoteTags;
function createNote(user, noteInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = user === null || user === void 0 ? void 0 : user.notes.create(noteInput);
        user === null || user === void 0 ? void 0 : user.notes.push(note);
        yield (user === null || user === void 0 ? void 0 : user.save());
        return note;
    });
}
exports.createNote = createNote;
function updateNote(user, noteId, updatedNote) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = user === null || user === void 0 ? void 0 : user.notes.id(noteId);
        if (!note)
            return (0, throw_error_1.default)(404, "Note not found");
        note === null || note === void 0 ? void 0 : note.set(updatedNote);
        yield (user === null || user === void 0 ? void 0 : user.save());
        return note;
    });
}
exports.updateNote = updateNote;
function deleteNote(user, noteId) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = user === null || user === void 0 ? void 0 : user.notes.id(noteId);
        if (!note)
            return (0, throw_error_1.default)(404, "Note not found");
        yield (note === null || note === void 0 ? void 0 : note.remove());
        yield (user === null || user === void 0 ? void 0 : user.save());
        return true;
    });
}
exports.deleteNote = deleteNote;
function deleteTrash(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const notes = user === null || user === void 0 ? void 0 : user.notes.filter((note) => !note.isTrash);
        user.notes = notes;
        yield (user === null || user === void 0 ? void 0 : user.save());
        return true;
    });
}
exports.deleteTrash = deleteTrash;
