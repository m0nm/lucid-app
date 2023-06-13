import { TypeOf } from "zod";
import { Document, Types } from "mongoose";
import { NoteDocument } from "../note";
import { TagDocument } from "../tag";
import { NotebookDocument } from "../notebook";
import { TaskDocument } from "../task";
import { CreateUserSchema, UpdateUserSchema } from "./user.schema";

export type User = {
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;

  google: {
    id: string;
    token: string;
    email: string;
  };

  github: {
    id: string;
    token: string;
    email: string;
  };

  notes: Types.DocumentArray<NoteDocument>;
  tags: Types.DocumentArray<TagDocument>;
  notebooks: Types.DocumentArray<NotebookDocument>;
  tasks: Types.DocumentArray<TaskDocument>;

  comparePassword(reqPassword: string): Promise<boolean>;
  signJwtToken(): string;
};

export type UserDocument = User & Document;

export type CreateUserReq = TypeOf<typeof CreateUserSchema>;
export type UpdateUserReq = TypeOf<typeof UpdateUserSchema>;
