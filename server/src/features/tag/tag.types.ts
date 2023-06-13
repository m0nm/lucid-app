import { TypeOf } from "zod";
import { Document } from "mongoose";
import { TagSchema } from "./tag.schema";

export type TagInput = {
  name: string;
};

export type TagDocument = TagInput &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

export type CreateTagReq = TypeOf<typeof TagSchema>;
export type UpdateTagReq = TypeOf<typeof TagSchema>;
