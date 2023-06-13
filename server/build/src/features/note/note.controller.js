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
exports.deleteTrashHandler = exports.deleteNoteHandler = exports.updateNoteHandler = exports.createNoteHandler = exports.getNoteTagsHandler = exports.getNotesHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const note_services_1 = require("./note.services");
function getNotesHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notes = yield (0, note_services_1.getNotes)(req.user);
            res.status(200).send(notes);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.getNotesHandler = getNotesHandler;
function getNoteTagsHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tags = yield (0, note_services_1.getNoteTags)(req.user, req.params.id);
            res.status(200).send(tags);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.getNoteTagsHandler = getNoteTagsHandler;
function createNoteHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const note = yield (0, note_services_1.createNote)(req.user, req.body);
            res.status(201).send(note);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.createNoteHandler = createNoteHandler;
function updateNoteHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const note = yield (0, note_services_1.updateNote)(req.user, req.params.id, req.body);
            res.status(200).send(note);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.updateNoteHandler = updateNoteHandler;
function deleteNoteHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, note_services_1.deleteNote)(req.user, req.params.id);
            res.sendStatus(204);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.deleteNoteHandler = deleteNoteHandler;
function deleteTrashHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, note_services_1.deleteTrash)(req.user);
            res.sendStatus(204);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.deleteTrashHandler = deleteTrashHandler;
