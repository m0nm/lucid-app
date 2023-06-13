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
exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.loginHandler = exports.authUserHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const auth_services_1 = require("./auth.services");
function authUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            res.status(200).send(user);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.authUserHandler = authUserHandler;
function loginHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const { user, token } = yield (0, auth_services_1.loginUser)(email, password);
            res.status(200).send({ user, token });
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.loginHandler = loginHandler;
function forgotPasswordHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            yield (0, auth_services_1.forgotPassword)(email);
            res.status(200).send({
                message: "A reset password link has been sent to email",
            });
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.forgotPasswordHandler = forgotPasswordHandler;
function resetPasswordHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const { password, token } = req.body;
            yield (0, auth_services_1.resetPassword)(userId, token, password);
            res.status(204).send({
                message: "Account password updated successfully",
            });
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.resetPasswordHandler = resetPasswordHandler;
