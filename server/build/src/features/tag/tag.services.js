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
exports.deleteTag = exports.updateTag = exports.createTag = exports.getTagNotes = exports.getTags = void 0;
const mongoose_1 = require("mongoose");
const throw_error_1 = __importDefault(require("../../utils/throw-error"));
function getTags(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return user === null || user === void 0 ? void 0 : user.tags;
    });
}
exports.getTags = getTags;
function getTagNotes(user, tagId) {
    return __awaiter(this, void 0, void 0, function* () {
        const tag = user === null || user === void 0 ? void 0 : user.tags.id(tagId);
        if (!tag)
            (0, throw_error_1.default)(404, "Tag not found");
        const notes = user === null || user === void 0 ? void 0 : user.notes.map((n) => n.tagsRef.some((tId) => tId === new mongoose_1.Types.ObjectId(tagId)));
        return notes;
    });
}
exports.getTagNotes = getTagNotes;
function createTag(user, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = user === null || user === void 0 ? void 0 : user.tags.findIndex((t) => t.name === tag.name);
        if (isExist && isExist > -1)
            (0, throw_error_1.default)(400, "Tag already exist");
        user === null || user === void 0 ? void 0 : user.tags.push(tag);
        yield (user === null || user === void 0 ? void 0 : user.save());
        return tag;
    });
}
exports.createTag = createTag;
function updateTag(user, tagId, updatedTag) {
    return __awaiter(this, void 0, void 0, function* () {
        const tag = user === null || user === void 0 ? void 0 : user.tags.id(tagId);
        if (!tag)
            return (0, throw_error_1.default)(404, "Tag not found");
        tag === null || tag === void 0 ? void 0 : tag.set(updatedTag);
        yield (user === null || user === void 0 ? void 0 : user.save());
        return tag;
    });
}
exports.updateTag = updateTag;
function deleteTag(user, tagId) {
    return __awaiter(this, void 0, void 0, function* () {
        const tag = user === null || user === void 0 ? void 0 : user.tags.id(tagId);
        if (!tag)
            return (0, throw_error_1.default)(404, "Tag not found");
        // remove tagId from all tagged notes
        const tagObjectId = new mongoose_1.Types.ObjectId(tagId);
        user === null || user === void 0 ? void 0 : user.notes.forEach((n) => {
            n.tagsRef = n.tagsRef.filter((tId) => tId.toString() !== tagObjectId.toString());
        });
        yield (tag === null || tag === void 0 ? void 0 : tag.remove());
        yield (user === null || user === void 0 ? void 0 : user.save());
        return true;
    });
}
exports.deleteTag = deleteTag;
