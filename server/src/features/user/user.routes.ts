import passport from "passport";
import express from "express";
import validateResource from "@/middleware/validate-resource";

import { checkUserExist } from "./user.middleware";
import { CreateUserSchema, UpdateUserSchema } from "./user.schema";

import {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "./user.controller";

export const router = express.Router();

router.post(
  "/",
  validateResource(CreateUserSchema),
  checkUserExist,
  createUserHandler
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateResource(UpdateUserSchema),
  updateUserHandler
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUserHandler
);
