import express, { Request } from "express";
import passport from "passport";
import validateResource from "@/middleware/validate-resource";
import { UserSchema } from "../user/user.schema";
import { ForgotPasswordSchema, ResetPasswordSchema } from "./auth.schema";

import {
  loginHandler,
  authUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
} from "./auth.controller";

const CLIENT_URL = process.env.CLIENT_URL + "/app/notes";
const CLIENT_LOGIN_URL = process.env.CLIENT_LOGIN_URL;

export const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authUserHandler
);

router.post("/", validateResource(UserSchema), loginHandler);

// password reset
router.post(
  "/forgot-password",
  validateResource(ForgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/reset-password/:userId",
  validateResource(ResetPasswordSchema),
  resetPasswordHandler
);

// google oauth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: CLIENT_LOGIN_URL,
    session: false,
  }),
  (req: Request, res) => {
    const token = req.user?.signJwtToken();
    res.cookie("x-auth-token", token);
    res.redirect(CLIENT_URL);
  }
);

// github oauth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: CLIENT_LOGIN_URL,
    session: false,
  }),
  (req: Request, res) => {
    const token = req.user?.signJwtToken();
    res.cookie("x-auth-token", token);
    res.redirect(CLIENT_URL);
  }
);
