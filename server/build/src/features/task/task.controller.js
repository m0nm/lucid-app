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
exports.deleteTaskHandler = exports.updateTaskHandler = exports.createTaskHandler = exports.getTasksHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const task_services_1 = require("./task.services");
function getTasksHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tasks = yield (0, task_services_1.getTasks)(req.user);
            res.status(200).send(tasks);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.getTasksHandler = getTasksHandler;
function createTaskHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield (0, task_services_1.createTask)(req.user, req.body);
            res.status(201).send(task);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.createTaskHandler = createTaskHandler;
function updateTaskHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield (0, task_services_1.updateTask)(req.user, req.params.id, req.body);
            res.status(200).send(task);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.updateTaskHandler = updateTaskHandler;
function deleteTaskHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, task_services_1.deleteTask)(req.user, req.params.id);
            res.sendStatus(204);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.deleteTaskHandler = deleteTaskHandler;
