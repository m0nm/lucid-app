import { NextFunction, Request, Response } from "express";
import logger from "@/utils/logger";

import { LoginReq } from "./auth.types";
import { loginUser, forgotPassword, resetPassword } from "./auth.services";

export async function authUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;

    res.status(200).send(user);
  } catch (e: any) {
    logger.error(e);
    next(e);
  }
}

export async function loginHandler(
  req: Request<{}, {}, LoginReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    res.status(200).send({ user, token });
  } catch (e: any) {
    logger.error(e);
    next(e);
  }
}
export async function forgotPasswordHandler(
  req: Request<{}, {}, { email: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    await forgotPassword(email);

    res.status(200).send({
      message: "A reset password link has been sent to email",
    });
  } catch (e: any) {
    logger.error(e);
    next(e);
  }
}
export async function resetPasswordHandler(
  req: Request<{ userId: string }, {}, { token: string; password: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    const { password, token } = req.body;

    await resetPassword(userId, token, password);

    res.status(204).send({
      message: "Account password updated successfully",
    });
  } catch (e: any) {
    logger.error(e);
    next(e);
  }
}
