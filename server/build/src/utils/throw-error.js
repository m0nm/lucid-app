"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwError(statusCode, message) {
    throw { success: false, statusCode, message };
}
exports.default = throwError;
