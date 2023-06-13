"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.ForgotPasswordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ForgotPasswordSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .string({ required_error: "Email is required" })
            .email("Email must be a valid email"),
    }),
});
exports.ResetPasswordSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string({ required_error: "Password is required" }),
    }),
});
