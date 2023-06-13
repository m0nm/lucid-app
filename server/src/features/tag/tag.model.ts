import { Schema, SchemaDefinition } from "mongoose";
import { TagDocument } from "./tag.types";

const schema: SchemaDefinition = {
  name: { required: true, type: String },
  kind: { type: String, default: "Tag" }, // to differntiate from Topic in client,
};

const options = { timestamps: true };

export const TagSchema = new Schema<TagDocument>(schema, options);
