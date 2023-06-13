import { NextFunction, Request, Response } from "express";
import logger from "@/utils/logger";

import { createUser, updateUser, deleteUser } from "./user.services";
import { CreateUserReq, UpdateUserReq } from "./user.types";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { newUser, token } = await createUser(req.body);

    return res.status(201).send({ user: newUser, token });
  } catch (e: any) {
    logger.error(e);
    next(e);
  }
}

export async function updateUserHandler(
  req: Request<{ id: string }, {}, UpdateUserReq["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);

    return res.status(200).send(updatedUser);
  } catch (e: any) {
    logger.error(e);
    next(e);
  }
}

export async function deleteUserHandler(
  req: Request<{ id: string }, {}, { password: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    await deleteUser(req.params.id, req.body.password);

    return res.sendStatus(204);
  } catch (e: any) {
    logger.error(e);
    next(e);
  }
}
