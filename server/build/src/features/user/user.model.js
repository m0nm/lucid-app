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
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_encryption_1 = __importDefault(require("mongoose-encryption"));
const note_1 = require("../note");
const notebook_1 = require("../notebook");
const tag_1 = require("../tag");
const task_1 = require("../task");
const jwt_1 = require("../../utils/jwt");
const user_utils_1 = require("./user.utils");
const schema = {
    email: { required: true, type: String, unique: true },
    password: { type: String },
    avatar: { type: String },
    google: {
        id: String,
        email: String,
    },
    github: {
        id: String,
        email: String,
    },
    notes: [note_1.NoteSchema],
    tags: [tag_1.TagSchema],
    notebooks: [notebook_1.NotebookSchema],
    tasks: [task_1.TaskSchema],
};
const options = { timestamps: true };
const userSchema = new mongoose_1.default.Schema(schema, options);
// allow encryption of notes
userSchema.plugin(mongoose_encryption_1.default.encryptedChildren);
// hash user password before saving to DB
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // only hash the password if it has been modified or is new
        if (!user.isModified("password"))
            return next();
        const hash = yield (0, user_utils_1.hashPassword)(user.password);
        user.password = hash;
        return next();
    });
});
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return yield (0, user_utils_1.comparePassword)(password, user.password);
    });
};
userSchema.methods.signJwtToken = function () {
    const user = this;
    return (0, jwt_1.signJwtToken)(user.email);
};
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
