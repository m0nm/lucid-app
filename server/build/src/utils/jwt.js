"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.signJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJwtToken(email, options) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRE_TIME;
    const token = jsonwebtoken_1.default.sign({ email }, secret, Object.assign({ expiresIn }, options));
    return token;
}
exports.signJwtToken = signJwtToken;
function verifyJwtToken(token) {
    const secret = process.env.JWT_SECRET;
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            if ((err === null || err === void 0 ? void 0 : err.message) == "jwt malformed")
                throw Error("invalid jwt token");
            else
                throw err;
        }
        return decoded;
    });
}
exports.verifyJwtToken = verifyJwtToken;
