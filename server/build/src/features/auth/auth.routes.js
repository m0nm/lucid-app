"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const validate_resource_1 = __importDefault(require("../../middleware/validate-resource"));
const user_schema_1 = require("../user/user.schema");
const auth_schema_1 = require("./auth.schema");
const auth_controller_1 = require("./auth.controller");
const CLIENT_URL = process.env.CLIENT_URL + "/app/notes";
const CLIENT_LOGIN_URL = process.env.CLIENT_LOGIN_URL;
exports.router = express_1.default.Router();
exports.router.get("/", passport_1.default.authenticate("jwt", { session: false }), auth_controller_1.authUserHandler);
exports.router.post("/", (0, validate_resource_1.default)(user_schema_1.UserSchema), auth_controller_1.loginHandler);
// password reset
exports.router.post("/forgot-password", (0, validate_resource_1.default)(auth_schema_1.ForgotPasswordSchema), auth_controller_1.forgotPasswordHandler);
exports.router.post("/reset-password/:userId", (0, validate_resource_1.default)(auth_schema_1.ResetPasswordSchema), auth_controller_1.resetPasswordHandler);
// google oauth
exports.router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
exports.router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: CLIENT_LOGIN_URL,
    session: false,
}), (req, res) => {
    var _a;
    const token = (_a = req.user) === null || _a === void 0 ? void 0 : _a.signJwtToken();
    res.cookie("x-auth-token", token);
    res.redirect(CLIENT_URL);
});
// github oauth
exports.router.get("/github", passport_1.default.authenticate("github", { scope: ["user:email"] }));
exports.router.get("/github/callback", passport_1.default.authenticate("github", {
    failureRedirect: CLIENT_LOGIN_URL,
    session: false,
}), (req, res) => {
    var _a;
    const token = (_a = req.user) === null || _a === void 0 ? void 0 : _a.signJwtToken();
    res.cookie("x-auth-token", token);
    res.redirect(CLIENT_URL);
});
