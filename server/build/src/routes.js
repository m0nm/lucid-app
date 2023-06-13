"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const verify_user_1 = __importDefault(require("./middleware/verify-user"));
const user_1 = require("./features/user");
const auth_1 = require("./features/auth");
const note_1 = require("./features/note");
const tag_1 = require("./features/tag");
const task_1 = require("./features/task");
const notebook_1 = require("./features/notebook");
const router = express_1.default.Router();
router.use("/api/healthcheck", (req, res) => {
    return res.sendStatus(200);
});
router.use("/api/users", user_1.userRoutes);
router.use("/api/auth", auth_1.authRoutes);
router.use("/api/notes", passport_1.default.authenticate("jwt", { session: false }), verify_user_1.default, note_1.noteRoutes);
router.use("/api/tags", passport_1.default.authenticate("jwt", { session: false }), verify_user_1.default, tag_1.tagRoutes);
router.use("/api/notebooks", passport_1.default.authenticate("jwt", { session: false }), verify_user_1.default, notebook_1.notebookRoutes);
router.use("/api/tasks", passport_1.default.authenticate("jwt", { session: false }), verify_user_1.default, task_1.taskRoutes);
exports.default = router;
