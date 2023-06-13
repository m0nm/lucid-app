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
exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const jwt_1 = require("../../utils/jwt");
const throw_error_1 = __importDefault(require("../../utils/throw-error"));
const user_model_1 = __importDefault(require("./user.model"));
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield user_model_1.default.create(user);
        const token = (0, jwt_1.signJwtToken)(newUser.email);
        return { newUser, token };
    });
}
exports.createUser = createUser;
function updateUser(userId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ _id: userId });
        if (user === null || typeof user === "undefined") {
            (0, throw_error_1.default)(404, "User not found");
            return;
        }
        const { avatar, email, password, newPassword } = updates;
        // update avatar
        if (avatar) {
            user.avatar = avatar;
            yield user.save();
        }
        // update email
        else if (email && password) {
            const emailExist = yield user_model_1.default.findOne({ email });
            if (emailExist)
                (0, throw_error_1.default)(400, "Email already taken");
            const valid = yield user.comparePassword(password);
            if (!valid)
                (0, throw_error_1.default)(400, "Invalid credentials");
            user.email = email;
            yield user.save();
        }
        // update password
        else if (password && newPassword) {
            const valid = yield user.comparePassword(password);
            if (!valid)
                (0, throw_error_1.default)(400, "Invalid credentials");
            user.password = newPassword;
            yield user.save();
        }
        return user;
    });
}
exports.updateUser = updateUser;
function deleteUser(userId, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ _id: userId });
        if (user === null || typeof user === "undefined") {
            (0, throw_error_1.default)(404, "User not found");
            return;
        }
        const valid = yield (user === null || user === void 0 ? void 0 : user.comparePassword(password));
        if (!valid)
            (0, throw_error_1.default)(400, "Invalid credentials");
        yield (user === null || user === void 0 ? void 0 : user.delete());
        return true;
    });
}
exports.deleteUser = deleteUser;
