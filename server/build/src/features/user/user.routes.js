"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const validate_resource_1 = __importDefault(require("../../middleware/validate-resource"));
const user_middleware_1 = require("./user.middleware");
const user_schema_1 = require("./user.schema");
const user_controller_1 = require("./user.controller");
exports.router = express_1.default.Router();
exports.router.post("/", (0, validate_resource_1.default)(user_schema_1.CreateUserSchema), user_middleware_1.checkUserExist, user_controller_1.createUserHandler);
exports.router.put("/:id", passport_1.default.authenticate("jwt", { session: false }), (0, validate_resource_1.default)(user_schema_1.UpdateUserSchema), user_controller_1.updateUserHandler);
exports.router.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), user_controller_1.deleteUserHandler);
