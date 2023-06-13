"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const validate_resource_1 = __importDefault(require("../../middleware/validate-resource"));
const task_schema_1 = require("./task.schema");
const task_controller_1 = require("./task.controller");
exports.router = express_1.default.Router();
exports.router.get("/", task_controller_1.getTasksHandler);
exports.router.post("/", (0, validate_resource_1.default)(task_schema_1.CreateTaskSchema), task_controller_1.createTaskHandler);
exports.router.put("/:id", (0, validate_resource_1.default)(task_schema_1.UpdateTaskSchema), task_controller_1.updateTaskHandler);
exports.router.delete("/:id", task_controller_1.deleteTaskHandler);
