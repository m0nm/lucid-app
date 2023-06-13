import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
import { NoteSchema } from "../note";
import { NotebookSchema } from "../notebook";
import { TagSchema } from "../tag";
import { TaskSchema } from "../task";
import { signJwtToken } from "@/utils/jwt";
import { UserDocument } from "./user.types";
import { hashPassword, comparePassword } from "./user.utils";

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

  notes: [NoteSchema],
  tags: [TagSchema],
  notebooks: [NotebookSchema],
  tasks: [TaskSchema],
};

const options = { timestamps: true };

const userSchema = new mongoose.Schema<UserDocument>(schema, options);

// allow encryption of notes
userSchema.plugin(encrypt.encryptedChildren);

// hash user password before saving to DB
userSchema.pre("save", async function (next) {
  const user = this as UserDocument;

  // only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next();

  const hash = await hashPassword(user.password);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (password: string) {
  const user = this as UserDocument;

  return await comparePassword(password, user.password);
};

userSchema.methods.signJwtToken = function () {
  const user = this as UserDocument;

  return signJwtToken(user.email);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
