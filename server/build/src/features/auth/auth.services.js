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
exports.resetPassword = exports.forgotPassword = exports.loginUser = void 0;
const throw_error_1 = __importDefault(require("../../utils/throw-error"));
const user_1 = require("../user");
const jwt_1 = require("../../utils/jwt");
const auth_utils_1 = require("./auth.utils");
const clientUrl = process.env.CLIENT_URL;
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.User.findOne({ email });
        if (!user && typeof user === "undefined")
            (0, throw_error_1.default)(404, "User not found");
        const isValidPassword = yield (user === null || user === void 0 ? void 0 : user.comparePassword(password));
        if (!isValidPassword)
            (0, throw_error_1.default)(400, "Invalid Credentials");
        const token = user === null || user === void 0 ? void 0 : user.signJwtToken();
        return { user, token };
    });
}
exports.loginUser = loginUser;
function forgotPassword(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.User.findOne({ email });
        if (user === null || typeof user === "undefined") {
            (0, throw_error_1.default)(404, "No user found by this email");
        }
        const token = (0, jwt_1.signJwtToken)(email, { expiresIn: "10m" });
        const link = `${clientUrl}/reset-password/?userId=${user === null || user === void 0 ? void 0 : user._id}&token=${token}`;
        yield (0, auth_utils_1.sendMail)(email, link);
        return true;
    });
}
exports.forgotPassword = forgotPassword;
function resetPassword(userId, token, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.User.findOne({ _id: userId });
        if (user === null || typeof user === "undefined") {
            (0, throw_error_1.default)(404, "No user found by this email");
        }
        (0, jwt_1.verifyJwtToken)(token);
        user.password = password;
        yield (user === null || user === void 0 ? void 0 : user.save());
        return true;
    });
}
exports.resetPassword = resetPassword;
