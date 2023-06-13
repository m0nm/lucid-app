"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const validate_resource_1 = __importDefault(require("../../middleware/validate-resource"));
const tag_schema_1 = require("./tag.schema");
const tag_controller_1 = require("./tag.controller");
exports.router = express_1.default.Router();
exports.router.get("/", tag_controller_1.getTagsHandler);
exports.router.get("/:id/notes", tag_controller_1.getTagNotesHandler);
exports.router.post("/", (0, validate_resource_1.default)(tag_schema_1.TagSchema), tag_controller_1.createTagHandler);
exports.router.put("/:id", (0, validate_resource_1.default)(tag_schema_1.TagSchema), tag_controller_1.updateTagHandler);
exports.router.delete("/:id", tag_controller_1.deleteTagHandler);
