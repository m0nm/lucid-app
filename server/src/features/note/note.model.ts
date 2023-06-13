import encrypt from "mongoose-encryption";
import { Schema } from "mongoose";
import { NoteDocument } from ".";

export const NoteSchema = new Schema<NoteDocument>(
  {
    title: { required: true, type: String },
    content: { default: "", type: String },
    isFavorite: { default: false, type: Boolean },
    isTrash: { default: false, type: Boolean },

    tagsRef: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

const encKey = process.env.MONGOOSE_ENC_KEY;
const signKey = process.env.MONGOOSE_SIGN_KEY;

// encrypt note
NoteSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: signKey,
  decryptPostSave: false,
});
