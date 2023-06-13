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
exports.deleteUserHandler = exports.updateUserHandler = exports.createUserHandler = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const user_services_1 = require("./user.services");
function createUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { newUser, token } = yield (0, user_services_1.createUser)(req.body);
            return res.status(201).send({ user: newUser, token });
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.createUserHandler = createUserHandler;
function updateUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedUser = yield (0, user_services_1.updateUser)(req.params.id, req.body);
            return res.status(200).send(updatedUser);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.updateUserHandler = updateUserHandler;
function deleteUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, user_services_1.deleteUser)(req.params.id, req.body.password);
            return res.sendStatus(204);
        }
        catch (e) {
            logger_1.default.error(e);
            next(e);
        }
    });
}
exports.deleteUserHandler = deleteUserHandler;
