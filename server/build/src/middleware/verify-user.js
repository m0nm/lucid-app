"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const throw_error_1 = __importDefault(require("../utils/throw-error"));
const verifyUser = (req, res, next) => {
    if (!req.user)
        (0, throw_error_1.default)(404, "User not found");
    next();
};
exports.default = verifyUser;
