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
exports.sendMail = void 0;
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const logger_1 = __importDefault(require("../../utils/logger"));
const env = process.env.NODE_ENV || "development";
const sendMail = (recieverEmail, link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transporter;
        if (env == "development") {
            // use this for testing
            let testAccount = yield nodemailer_1.default.createTestAccount();
            transporter = nodemailer_1.default.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        }
        else {
            transporter = nodemailer_1.default.createTransport({
                // @ts-ignore
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
        }
        const logo = path_1.default.resolve(__dirname, "../../views/assets/logo-light-mode.png");
        const html = yield ejs_1.default.renderFile(path_1.default.resolve(__dirname, "../../views/reset-password.ejs"), {
            link,
            logo,
        });
        let info = yield transporter.sendMail({
            from: '"Lucid" <lucid@tech.com>',
            to: recieverEmail,
            subject: "Reset your password",
            text: `reset password link (skip this message if you did not request a password reset), ${link}`,
            html,
        });
        if (env == "development") {
            logger_1.default.info("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info)); // works in test
        }
        return true;
    }
    catch (error) {
        logger_1.default.error(error);
        process.exit(1);
    }
});
exports.sendMail = sendMail;
