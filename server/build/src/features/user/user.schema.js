"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
const user_constants_1 = __importDefault(require("./user.constants"));
exports.UserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: user_constants_1.default.EMAILREQUIRED }).email(user_constants_1.default.EMAILINVALID),
        password: zod_1.z
            .string({ required_error: user_constants_1.default.PASSWORDREQUIRED })
            .min(6, user_constants_1.default.PASSWORDLENGTH),
        avatar: zod_1.z.string().url().optional(),
    }),
});
exports.CreateUserSchema = exports.UserSchema.merge(zod_1.z.object({
    body: exports.UserSchema.shape.body.extend({
        passwordConfirm: zod_1.z.string({
            required_error: user_constants_1.default.PASSWORDCONFIRMREQUIRED,
        }),
    }),
})).refine(({ body }) => body.password === body.passwordConfirm, {
    message: user_constants_1.default.PASSWORDMATCH,
    path: ["password_confirm"],
});
exports.UpdateUserSchema = exports.UserSchema.merge(zod_1.z.object({
    body: exports.UserSchema.shape.body.deepPartial().extend({
        newPassword: zod_1.z.string().min(6, user_constants_1.default.PASSWORDLENGTH).optional(),
    }),
}));
