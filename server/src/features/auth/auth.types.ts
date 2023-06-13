import { TypeOf } from "zod";
import { UserSchema } from "../user/user.schema";

export type LoginReq = TypeOf<typeof UserSchema>;
