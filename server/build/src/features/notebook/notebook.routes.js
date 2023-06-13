"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const validate_resource_1 = __importDefault(require("../../middleware/validate-resource"));
const notebook_schema_1 = require("./notebook.schema");
const notebook_controller_1 = require("./notebook.controller");
exports.router = express_1.default.Router();
exports.router.get("/", notebook_controller_1.getNotebooksHandler);
exports.router.post("/", (0, validate_resource_1.default)(notebook_schema_1.CreateNotebookSchema), notebook_controller_1.createNotebookHandler);
exports.router.post("/:notebookId/topics", (0, validate_resource_1.default)(notebook_schema_1.CreateTopicSchema), notebook_controller_1.createTopicHandler);
exports.router.put("/:id", (0, validate_resource_1.default)(notebook_schema_1.UpdateNotebookSchema), notebook_controller_1.updateNotebookHandler);
exports.router.put("/:notebookId/topics/:topicId", (0, validate_resource_1.default)(notebook_schema_1.UpdateTopicSchema), notebook_controller_1.updateTopicHandler);
exports.router.delete("/:id", notebook_controller_1.deleteNotebookHandler);
exports.router.delete("/:notebookId/topics/:topicId", notebook_controller_1.deleteTopicHandler);
