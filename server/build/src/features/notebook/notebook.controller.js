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
exports.deleteTopicHandler = exports.deleteNotebookHandler = exports.updateTopicHandler = exports.updateNotebookHandler = exports.createTopicHandler = exports.createNotebookHandler = exports.getNotebooksHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const notebook_services_1 = require("./notebook.services");
function getNotebooksHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notebooks = yield (0, notebook_services_1.getNotebooks)(req.user);
            res.status(200).send(notebooks);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.getNotebooksHandler = getNotebooksHandler;
function createNotebookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notebook = yield (0, notebook_services_1.createNotebook)(req.user, req.body);
            res
                .status(201)
                .send({ notebook, message: "Notebook created successfully" });
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.createNotebookHandler = createNotebookHandler;
function createTopicHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const topic = yield (0, notebook_services_1.createTopic)(req.user, req.params.notebookId, req.body.name);
            res.status(201).send({ topic, message: "Topic created successfully" });
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.createTopicHandler = createTopicHandler;
function updateNotebookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notebook = yield (0, notebook_services_1.updateNotebook)(req.user, req.params.id, req.body);
            res.status(200).send(notebook);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.updateNotebookHandler = updateNotebookHandler;
function updateTopicHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { notebookId, topicId } = req.params;
            const topic = yield (0, notebook_services_1.updateTopic)(req.user, notebookId, topicId, req.body);
            res.status(200).send(topic);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.updateTopicHandler = updateTopicHandler;
function deleteNotebookHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, notebook_services_1.deleteNotebook)(req.user, req.params.id);
            res.sendStatus(204);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.deleteNotebookHandler = deleteNotebookHandler;
function deleteTopicHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { notebookId, topicId } = req.params;
            yield (0, notebook_services_1.deleteTopic)(req.user, notebookId, topicId);
            res.sendStatus(204);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.deleteTopicHandler = deleteTopicHandler;
