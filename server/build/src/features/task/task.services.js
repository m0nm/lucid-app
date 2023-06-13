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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const throw_error_1 = __importDefault(require("../../utils/throw-error"));
function getTasks(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return user === null || user === void 0 ? void 0 : user.tasks;
    });
}
exports.getTasks = getTasks;
function createTask(user, task) {
    return __awaiter(this, void 0, void 0, function* () {
        user === null || user === void 0 ? void 0 : user.tasks.push(task);
        yield (user === null || user === void 0 ? void 0 : user.save());
        return task;
    });
}
exports.createTask = createTask;
function updateTask(user, taskId, updatedtask) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = user === null || user === void 0 ? void 0 : user.tasks.id(taskId);
        if (!task)
            return (0, throw_error_1.default)(404, "task not found");
        task === null || task === void 0 ? void 0 : task.set(updatedtask);
        yield (user === null || user === void 0 ? void 0 : user.save());
        return task;
    });
}
exports.updateTask = updateTask;
function deleteTask(user, taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = user === null || user === void 0 ? void 0 : user.tasks.id(taskId);
        if (!task)
            return (0, throw_error_1.default)(404, "task not found");
        yield (task === null || task === void 0 ? void 0 : task.remove());
        yield (user === null || user === void 0 ? void 0 : user.save());
        return true;
    });
}
exports.deleteTask = deleteTask;
