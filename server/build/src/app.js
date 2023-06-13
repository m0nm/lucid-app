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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
require("../config/mongoose");
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const db_connect_1 = __importDefault(require("./utils/db-connect"));
const logger_1 = __importDefault(require("./utils/logger"));
const passport_2 = require("../config/passport");
const app = (0, express_1.default)();
const clientUrl = process.env.CLIENT_URL;
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./views/assets")));
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({ origin: clientUrl }));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
(0, passport_2.applyPassportStrategy)(passport_1.default);
app.use(routes_1.default);
app.use(error_handler_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`App is running at port: ${PORT}`);
    yield (0, db_connect_1.default)();
}));
