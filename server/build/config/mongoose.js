"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_lean_virtuals_1 = __importDefault(require("mongoose-lean-virtuals"));
// access virtuals with lean()
mongoose_1.default.plugin(mongoose_lean_virtuals_1.default);
// return id insteald of _id
mongoose_1.default.set("toJSON", {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
        if (converted.password)
            delete converted.password;
    },
});
