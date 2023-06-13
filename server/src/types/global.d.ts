import { UserDocument } from "@/features/user";

export {};

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
