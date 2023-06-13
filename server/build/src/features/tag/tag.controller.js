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
exports.deleteTagHandler = exports.updateTagHandler = exports.createTagHandler = exports.getTagNotesHandler = exports.getTagsHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const tag_services_1 = require("./tag.services");
function getTagsHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tags = yield (0, tag_services_1.getTags)(req.user);
            res.status(200).send(tags);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.getTagsHandler = getTagsHandler;
function getTagNotesHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notes = yield (0, tag_services_1.getTagNotes)(req.user, req.params.id);
            res.status(200).send(notes);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.getTagNotesHandler = getTagNotesHandler;
function createTagHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tag = yield (0, tag_services_1.createTag)(req.user, req.body);
            res.status(201).send(tag);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.createTagHandler = createTagHandler;
function updateTagHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tag = yield (0, tag_services_1.updateTag)(req.user, req.params.id, req.body);
            res.status(200).send(tag);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.updateTagHandler = updateTagHandler;
function deleteTagHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, tag_services_1.deleteTag)(req.user, req.params.id);
            res.sendStatus(204);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.deleteTagHandler = deleteTagHandler;
