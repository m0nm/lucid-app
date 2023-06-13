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
const logger_1 = __importDefault(require("./logger"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        const db_local_URI = process.env.DB_LOCAL_URI;
        const db_remove_URI = process.env.DB_REMOTE_URI;
        const nodeEnv = process.env.NODE_ENV || "development";
        try {
            yield mongoose_1.default.connect(nodeEnv == "development" ? db_local_URI : db_remove_URI);
            logger_1.default.info("DB connected");
        }
        catch (error) {
            logger_1.default.error(error);
            process.exit(1);
        }
    });
}
exports.default = dbConnect;
