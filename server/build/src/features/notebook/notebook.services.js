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
exports.deleteTopic = exports.deleteNotebook = exports.updateTopic = exports.updateNotebook = exports.createTopic = exports.createNotebook = exports.getNotebooks = void 0;
const throw_error_1 = __importDefault(require("../../utils/throw-error"));
function getNotebooks(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return user === null || user === void 0 ? void 0 : user.notebooks;
    });
}
exports.getNotebooks = getNotebooks;
function createNotebook(user, notebook) {
    return __awaiter(this, void 0, void 0, function* () {
        user === null || user === void 0 ? void 0 : user.notebooks.push(notebook);
        yield (user === null || user === void 0 ? void 0 : user.save());
        return notebook;
    });
}
exports.createNotebook = createNotebook;
function createTopic(user, notebookId, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const notebook = user === null || user === void 0 ? void 0 : user.notebooks.id(notebookId);
        if (!notebook)
            return (0, throw_error_1.default)(404, "Notebook not found");
        notebook === null || notebook === void 0 ? void 0 : notebook.topics.push({ name });
        yield (user === null || user === void 0 ? void 0 : user.save());
        return name;
    });
}
exports.createTopic = createTopic;
function updateNotebook(user, notebookId, updatedNotebook) {
    return __awaiter(this, void 0, void 0, function* () {
        const notebook = user === null || user === void 0 ? void 0 : user.notebooks.id(notebookId);
        if (!notebook)
            return (0, throw_error_1.default)(404, "Notebook not found");
        notebook === null || notebook === void 0 ? void 0 : notebook.set(updatedNotebook);
        yield (user === null || user === void 0 ? void 0 : user.save());
        return notebook;
    });
}
exports.updateNotebook = updateNotebook;
function updateTopic(user, notebookId, topicId, updatedTopic) {
    return __awaiter(this, void 0, void 0, function* () {
        const notebook = user === null || user === void 0 ? void 0 : user.notebooks.id(notebookId);
        if (!notebook)
            return (0, throw_error_1.default)(404, "Notebook not found");
        let topic = notebook.topics.id(topicId);
        if (!topic)
            return (0, throw_error_1.default)(404, "Topic not found");
        const { noteId, name, notesRef } = updatedTopic;
        if (name) {
            topic.name = name;
        }
        if (notesRef) {
            topic.notesRef = notesRef;
        }
        if (noteId && !topic.notesRef.includes(noteId)) {
            topic.notesRef.push(noteId);
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        return topic;
    });
}
exports.updateTopic = updateTopic;
function deleteNotebook(user, notebookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const notebook = user === null || user === void 0 ? void 0 : user.notebooks.id(notebookId);
        if (!notebook)
            return (0, throw_error_1.default)(404, "Notebook not found");
        notebook.topics.forEach((topic) => {
            topic.notesRef.forEach((nId) => {
                const note = user === null || user === void 0 ? void 0 : user.notes.id(nId);
                if (note) {
                    note.isTrash = true;
                    note.isFavorite = false;
                }
            });
        });
        yield (notebook === null || notebook === void 0 ? void 0 : notebook.remove());
        yield (user === null || user === void 0 ? void 0 : user.save());
        return true;
    });
}
exports.deleteNotebook = deleteNotebook;
function deleteTopic(user, notebookId, topicId) {
    return __awaiter(this, void 0, void 0, function* () {
        const notebook = user === null || user === void 0 ? void 0 : user.notebooks.id(notebookId);
        if (!notebook)
            return (0, throw_error_1.default)(404, "Notebook not found");
        const topic = notebook.topics.id(topicId);
        if (!topic)
            return (0, throw_error_1.default)(404, "Topic not found");
        topic.notesRef.forEach((nId) => {
            const note = user === null || user === void 0 ? void 0 : user.notes.id(nId);
            if (note) {
                note.isTrash = true;
                note.isFavorite = false;
            }
        });
        yield (topic === null || topic === void 0 ? void 0 : topic.remove());
        yield (user === null || user === void 0 ? void 0 : user.save());
        return true;
    });
}
exports.deleteTopic = deleteTopic;
